const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controllers')

router.get('/', roleController.getAllRoles);
router.post('/add', roleController.createRole);
router.delete('/:name_role', roleController.deleteRole);

module.exports = router;