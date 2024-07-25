const express = require('express');
const router = express.Router();
const statusController = require('../controllers/status.controllers');
const { validateCreateStatus, validateDeleteStatus } = require('../validators/status.validators');

router.get('/', statusController.getAllStatus);
router.post('/add', validateCreateStatus, statusController.createStatus);
router.delete('/delete', validateDeleteStatus, statusController.deleteStatus);


module.exports = router;