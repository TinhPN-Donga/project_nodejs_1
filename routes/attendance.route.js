var express = require('express');
var router = express.Router();

const AttendanceController = require('../controllers/attendance.controller');

/* [GET] last record */
router.get('/last', AttendanceController.getLastAttendance);

/* [GET] get all records */
router.get('/', AttendanceController.getAttendances);

/* [GET] get detail by ID */
router.get('/:id', AttendanceController.getAttendance);

/* [POST] create new attendance record */
router.post('/create', AttendanceController.postAttendance);

/* [PUT] update attendance */
router.put('/update/:id', AttendanceController.putUpdateAttendance);

/* [DELETE] delete one */
router.delete('/delete/:id', AttendanceController.deleteAttendance);

/* [DELETE] delete all */
router.delete('/delete', AttendanceController.deleteAllAttendances);

module.exports = router;
