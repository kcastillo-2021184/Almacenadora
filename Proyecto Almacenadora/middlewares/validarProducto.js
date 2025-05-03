import Producto from '../src/product/product.model.js'

export const validarProducto = async (req, res, next) => {
    let { nombre, categoria, stock, proveedor, fechaEntrada } = req.body

    if (!nombre || !categoria || !proveedor || stock === undefined) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    // Convertir stock a número
    stock = Number(stock)
    if (isNaN(stock) || stock < 0) {
        return res.status(400).json({ error: 'El stock debe ser un número mayor o igual a 0' })
    }
    req.body.stock = stock

    // Normalizar campos
    nombre = nombre.toLowerCase().trim()
    categoria = categoria.toLowerCase().trim()
    proveedor = proveedor.toLowerCase().trim()

    req.body.nombre = nombre
    req.body.categoria = categoria
    req.body.proveedor = proveedor
    req.body.stock = stock

    // Validar nombre único
    const existe = await Producto.findOne({ nombre })
    if (existe) {
        return res.status(400).json({ error: 'Ya existe un producto con ese nombre' })
    }

    next()
}

export const validarActualizarProducto = async (req, res, next) => {
    let { nombre, categoria, stock, proveedor } = req.body

    // Si se envía "stock", validar que sea un número válido
    if (stock !== undefined) {
        stock = Number(stock)
        if (isNaN(stock) || stock < 0) {
            return res.status(400).json({ error: 'El stock debe ser un número mayor o igual a 0' })
        }
        req.body.stock = stock
    }

    // Si se envía "nombre", validar duplicado y normalizar
    if (nombre !== undefined) {
        nombre = nombre.toLowerCase().trim()
        const existe = await Producto.findOne({ nombre })
        if (existe) {
            return res.status(400).json({ error: 'Ya existe un producto con ese nombre' })
        }
        req.body.nombre = nombre
    }

    // Si se envía "categoria", normalizar
    if (categoria !== undefined) {
        req.body.categoria = categoria.toLowerCase().trim()
    }

    // Si se envía "proveedor", normalizar
    if (proveedor !== undefined) {
        req.body.proveedor = proveedor.toLowerCase().trim()
    }

    next()
}
