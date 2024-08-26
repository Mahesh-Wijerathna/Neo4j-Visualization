const express = require('express');

const DeviceController = require('../controllers/DeviceController');
const router = express.Router();


router.get('/router', (req, res) => res.send('Device Routes is Working'));
router.get('/controller', DeviceController.controller);
router.get('/model', DeviceController.model);
router.post('/', DeviceController.create);
router.get('/:ipAddress', DeviceController.getWithIpAddress);
router.get('/', DeviceController.getAll);
router.put('/:ipAddress', DeviceController.updateStatus);
router.delete('/:ipAddress', DeviceController.delete);

module.exports = router;