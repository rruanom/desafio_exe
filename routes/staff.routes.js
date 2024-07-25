const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controllers')

router.get('/', staffController.readStaff);
router.get('/:email', staffController.readStaffByEmail);
router.post('/add', staffController.createStaff);
router.put('/', staffController.updateStaffbyStaff);
router.put('/:email', staffController.updateStaffbyAdmin);

module.exports = router;