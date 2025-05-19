import Producto from './product.model.js'

// Crear producto
export const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body)
        await nuevoProducto.save()
        res.status(201).json(nuevoProducto)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Editar producto
export const editarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' })
        res.json(producto)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Eliminar producto
export const eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            { estado: false },
            { new: true }
        )

        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' })
        res.json({ mensaje: 'Producto desactivado (soft delete)', producto })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Filtrar productos
export const filtrarProductos = async (req, res) => {
    try {
        const { nombre, categoria, fechaEntrada, estado } = req.query
        const filtro = {}

        if (nombre) filtro.nombre = new RegExp(nombre, 'i')
        if (categoria) filtro.categoria = new RegExp(categoria, 'i')
        // if (fechaEntrada) filtro.fechaEntrada = new Date(fechaEntrada)

        if (estado === 'true') {
            filtro.estado = true
        } else if (estado === 'false') {
            filtro.estado = false
        }

        if (estado === 'true' || estado === 'false') {
            // Solo una lista (activos o inactivos)
            const productos = await Producto.find(filtro)
            return res.json(productos)
        } else {
            // Si no se especifica el estado, devuelve separados
            const [activos, inactivos] = await Promise.all([
                Producto.find({ ...filtro, estado: true }),
                Producto.find({ ...filtro, estado: false })
            ])

            return res.json({ activos, inactivos })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getStockAlerts = async (req, res) => {
    try {
        const threshold = 10

        const products = await Producto.find({ stock: { $lt: threshold }, estado: true })

        if (products.length === 0) return res.status(404).send({ success: false, message: `No products below stock threshold of ${threshold}` })

        return res.send({ success: true, message: `Products below stock threshold of ${threshold}`, products })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const getExpirationAlerts = async (req, res) => {
    try {
        const daysBefore = 7
        const now = new Date()
        const alertDate = new Date(now)
        alertDate.setDate(now.getDate() + daysBefore)

        const products = await Producto.find({
            expirationDate: { $lte: alertDate },
            estado: true
        })

        if (!products.length) return res.status(404).send({ success: false, message: `No products expiring within ${daysBefore} days` })

        return res.send({ success: true, message: `Products expiring within ${daysBefore} days`, products })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

// Función para obtener el total en inventario 
export const getInventory = async (req, res) => {
    try {
        const products = await Producto.find()
        const totalInventoryValue = products.reduce((acc, product) => acc + product.stock * product.price, 0)
        return res.send(
            { 
                success: true, 
                data: products, 
                total: totalInventoryValue 
            }
        )
    } catch (error) {
        res.status(500).send(
            { 
                error: error.message 
            }
        )
    }
}