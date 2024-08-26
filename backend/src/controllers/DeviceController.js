const DeviceModel = require('../models/DeviceModel');

exports.controller = async (req, res) => {
    res.send('Device Controller is Working');
}

exports.model = async (req, res) => {
    const connection = await DeviceModel.model();
    res.json(connection);
}

exports.create = async (req, res) => {
    console.log("req.body: ", req.body);
    const { ipAddress, type, description, status } = req.body;
    console.log("ip address: ", ipAddress , "type: ", type, "description: ", description, "status: ", status);

    try {
        const device = await DeviceModel.create(ipAddress, type, description, status);
        res.status(201).json(device);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getWithIpAddress = async (req, res) => {
    console.log("req.params: ", req.params);
    const { ipAddress } = req.params;
    try {
        const device = await DeviceModel.findByIpAddress(ipAddress);
        if (device) {
            res.json(device);
        } else {
            res.status(404).json({ error: 'Device not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getAll = async (req, res) => {
    try {
        const devices = await DeviceModel.findAll();
        res.json(devices);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.updateStatus = async (req, res) => {
    const { ipAddress } = req.params;
    const { status } = req.body;
    try {
        const device = await DeviceModel.updateStatus(ipAddress, status);
        res.json(device);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.delete = async (req, res) => {
    const { ipAddress } = req.params;
    try {
        await DeviceModel.delete(ipAddress);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}
