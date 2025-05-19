import Supplier from './supplier.model.js'
import Product from '../product/product.model.js'

export const getAll = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const suppliers = await Supplier.find({ status: true }).populate('products').skip(Number(skip)).limit(Number(limit))

        if (!suppliers.length) return res.status(404).send({ success: false, message: 'Suppliers not found' })

        return res.send({ success: true, message: 'Suppliers found', suppliers, total: suppliers.length })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const get = async (req, res) => {
    try {
        const { id } = req.params
        const supplier = await Supplier.findById(id)

        if (!supplier || !supplier.status) return res.status(404).send({ success: false, message: 'Supplier not found' })

        return res.send({ success: true, message: 'Supplier found', supplier })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const createSupplier = async (req, res) => {
    try {

        const { name, contact } = req.body
        const newSupplier = new Supplier({ name, contact })
        await newSupplier.save()
        return res.status(201).send({ success: true, message: 'Supplier created successfully', supplier: newSupplier })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const update = async (req, res) => {
    try {

        const { id } = req.params
        const supplier = await Supplier.findById(id)
        if (!supplier || !supplier.status) return res.status(404).send({ success: false, message: 'Supplier not found' })

        const { name, contact, products } = req.body
        if (name) supplier.name = name
        if (contact) supplier.contact = contact

        await supplier.save()
        return res.send({ success: true, message: 'Supplier updated', supplier })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const privateUpdate = async (req, res) => {
    try {

        const { id } = req.params
        const supplier = await Supplier.findById(id)
        if (!supplier || !supplier.status) return res.status(404).send({ success: false, message: 'Supplier not found' })

        const { name, contact, products } = req.body
        if (name) supplier.name = name
        if (contact) supplier.contact = contact

        await supplier.save()
        return res.send({ success: true, message: 'Supplier updated', supplier })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const deleteSupplier = async (req, res) => {
    try {
        
        const { id } = req.params
        const supplier = await Supplier.findById(id)
        if (!supplier || !supplier.status) return res.status(404).send({ success: false, message: 'Supplier not found' })

        supplier.status = false
        await supplier.save()
        return res.send({ success: true, message: 'Supplier deleted successfully' })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const privateDeleteSupplier = async (req, res) => {
    try {
        
        const { id } = req.params
        const supplier = await Supplier.findById(id)
        if (!supplier || !supplier.status) return res.status(404).send({ success: false, message: 'Supplier not found' })

        supplier.status = false
        await supplier.save()
        return res.send({ success: true, message: 'Supplier deleted successfully' })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}