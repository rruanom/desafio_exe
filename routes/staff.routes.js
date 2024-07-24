const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controllers')

router.get('/', staffController.readStaff);
router.post('/add', staffController.createStaff);
router.delete('/:email', staffController.deleteStaff);
//Faltan 2 put
module.exports = router;