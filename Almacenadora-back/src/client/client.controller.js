import Client from './client.model.js'

export const getAll = async (req, res) => {
    try {

        const { limit = 20, skip = 0 } = req.query
        const clients = await Client.find({ status: true }).skip(Number(skip)).limit(Number(limit))

        if (!clients.length) return res.status(404).send({ success: false, message: 'Clients not found' })

        return res.send({ success: true, message: 'Clients found', clients, total: clients.length })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const get = async (req, res) => {
    try {

        const { id } = req.params
        const client = await Client.findById(id)

        if (!client || !client.status) return res.status(404).send({ success: false, message: 'Client not found' })

        return res.send({ success: true, message: 'Client found', client })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const createClient = async (req, res) => {
    try {

        const { name, company, contact } = req.body
        const newClient = new Client({ name, company, contact })
        await newClient.save()
        return res.status(201).send({ success: true, message: 'Client created successfully', client: newClient })

    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const client = await Client.findById(id)
        if (!client || !client.status) return res.status(404).send({ success: false, message: 'Client not found' })

        const { name, company, contact } = req.body
        if (name) client.name = name
        if (company) client.company = company
        if (contact) client.contact = contact

        await client.save()
        return res.send({ success: true, message: 'Client updated', client })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const privateUpdate = async (req, res) => {
    try {
        const { id } = req.params
        const client = await Client.findById(id)
        if (!client || !client.status) return res.status(404).send({ success: false, message: 'Client not found' })

        const { name, company, contact } = req.body
        if (name) client.name = name
        if (company) client.company = company
        if (contact) client.contact = contact

        await client.save()
        return res.send({ success: true, message: 'Client updated', client })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const deleteClient = async (req, res) => {
    try {
        
        const { id } = req.params
        const client = await Client.findById(id)
        if (!client || !client.status) return res.status(404).send({ success: false, message: 'Client not found' })

        client.status = false
        await client.save()
        return res.send({ success: true, message: 'Client deleted successfully' })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const privateDeleteClient = async (req, res) => {
    try {
        
        const { id } = req.params
        const client = await Client.findById(id)
        if (!client || !client.status) return res.status(404).send({ success: false, message: 'Client not found' })

        client.status = false
        await client.save()
        return res.send({ success: true, message: 'Client deleted successfully' })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}