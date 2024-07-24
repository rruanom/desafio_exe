const gradesController = require('../controllers/grades_apt.controllers');
const router = require('express').Router();


router.get("/", gradesController.readGrades);
router.get("/:email", gradesController.readGradesByEmail);
router.post("/add", gradesController.createGrades);
router.put("/", gradesController.updateGradebyAdmin);
router.delete("/:email", gradesController.deleteGrades);

module.exports = router;