const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controllers')
const {
    validateCreateStaff,
    validateReadStaffByEmail,
    validateUpdateStaffByStaff,
    validateUpdateStaffByAdmin
} = require('../validators/staff.validators');

router.get('/', staffController.readStaff);
router.get('/:email', validateReadStaffByEmail, staffController.readStaffByEmail);
router.post('/add', validateCreateStaff, staffController.createStaff);
router.post('/login', staffController.loginStaff);
router.put('/', validateUpdateStaffByStaff, staffController.updateStaffbyStaff);
router.put('/:email', validateUpdateStaffByAdmin, staffController.updateStaffbyAdmin);

module.exports = router;