const e = require('express');
const ConnectionModel = require('../models/ConnectionModel');

exports.controller = async (req, res) => {
    res.send('Connection Controller is Working');
}

exports.model = async (req, res) => {
    const connection = await ConnectionModel.model();
    res.json(connection);
}

exports.create = async (req, res) => {
    console.log("req.body: ", req.body);
    const { connectionId, sourceIp, targetIp, description, status } = req.body;
    console.log("connectionId: ", connectionId, "sourceIp: ", sourceIp, "targetIp: ", targetIp, "description: ", description, "status: ", status);

    try {
        const connection = await ConnectionModel.create(connectionId, sourceIp, targetIp, description, status);
        res.status(201).json(connection);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getWithConnectionId = async (req, res) => {
    const { connectionId } = req.params;
    try {
        const connection = await ConnectionModel.findByConnectionId(connectionId);
        if (connection) {
            res.json(connection);
        } else {
            res.status(404).json({ error: 'Connection not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.updateStatus = async (req, res) => {
    const { connectionId } = req.params;
    const { status } = req.body;
    try {
        const connection = await ConnectionModel.updateStatus(connectionId, status);
        res.json(connection);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.delete = async (req, res) => {
    const { connectionId } = req.params;
    try {
        await ConnectionModel.delete(connectionId);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

exports.getAll = async (req, res) => {
    try {
        const connections = await ConnectionModel.getAll();
        res.json(connections);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}