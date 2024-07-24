const express = require('express');
const router = express.Router();
const statusController = require('../controllers/status.controllers');

router.get('/', statusController.getAllStatus);
router.post('/add', statusController.createStatus);
router.delete('/delete', statusController.deleteStatus);


module.exports = router;