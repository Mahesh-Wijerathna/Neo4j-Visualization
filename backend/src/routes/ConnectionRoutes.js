const express = require('express');

const ConnectionController = require('../controllers/ConnectionController');
const router = express.Router();


router.get('/router', (req, res) => res.send('Connection Routes is Working'));
router.get('/controller', ConnectionController.controller);
router.get('/model', ConnectionController.model);
router.post('/', ConnectionController.create);
router.get('/:connectionId', ConnectionController.getWithConnectionId);
router.get('/', ConnectionController.getAll);
router.put('/:connectionId', ConnectionController.updateStatus);
router.delete('/:connectionId', ConnectionController.delete);

module.exports = router;
