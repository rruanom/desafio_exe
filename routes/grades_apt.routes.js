const gradesController = require('../controllers/grades_apt.controllers');
const router = require('express').Router();
const { 
    validateCreateGrades, 
    validateReadGradesByEmail, 
    validateUpdateGradeByAdmin, 
    validateDeleteGrades 
} = require('../validators/grades_apt.validators');


router.get("/", gradesController.readGrades);
router.get("/:email", validateReadGradesByEmail, gradesController.readGradesByEmail);
router.post("/add", validateCreateGrades, gradesController.createGrades);
router.put("/", validateUpdateGradeByAdmin, gradesController.updateGradebyAdmin);
router.delete("/:email", validateDeleteGrades, gradesController.deleteGrades);

module.exports = router;