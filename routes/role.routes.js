const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controllers');
const {
    validateCreateRole,
    validateGetRoleById,
    validateGetRoleByName,
    validateUpdateRole,
    validateDeleteRole
} = require('../validators/role.validators');

router.get('/', roleController.getAllRoles);
router.post('/add', validateCreateRole, roleController.createRole);
router.delete('/:name_role', validateDeleteRole, roleController.deleteRole);
router.get('/:id_role', validateGetRoleById, roleController.getRoleById);
router.get('/:name_role', validateGetRoleByName, roleController.getRoleByName);
router.put('/:id_role', validateUpdateRole, roleController.updateRole);

module.exports = router;