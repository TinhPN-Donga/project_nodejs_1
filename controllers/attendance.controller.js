const AttendanceService = require('../services/attendance.service');

const defaultResult = {
  message: 'success',
  error: null,
  status: true,
  result: null,
};

/* [POST] create attendance */
const postAttendance = async (req, res) => {
  try {
    const body = req.body;
    if (typeof body.last_update === 'number') {
      body.last_update = new Date(body.last_update * 1000);
    }
    const data = await AttendanceService.createAttendance(body);
    const result = { ...defaultResult, result: data };
    return res.status(201).json(result);
  } catch (error) {
    const result = { ...defaultResult, status: false, message: 'failed', error: error.message };
    return res.status(500).json(result);
  }
};

/* [GET] get all attendance records */
const getAttendances = async (req, res) => {
  try {
    const data = await AttendanceService.findAll();
    console.log(data);
    
    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = { ...defaultResult, status: false, message: 'failed', error: error.message };
    return res.status(500).json(result);
  }
};

/* [GET] get detail by ID */
const getAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await AttendanceService.findById(id);
    if (!data) throw new Error('Attendance record not found');

    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = { ...defaultResult, status: false, message: 'failed', error: error.message };
    return res.status(500).json(result);
  }
};

/* [PUT] update record */
const putUpdateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await AttendanceService.updateAttendance(id, req.body);

    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = { ...defaultResult, status: false, message: 'failed', error: error.message };
    return res.status(500).json(result);
  }
};

/* [DELETE] delete one */
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await AttendanceService.deleteById(id);

    if (!data) throw new Error('Record not found to delete');

    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = { ...defaultResult, status: false, message: 'failed', error: error.message };
    return res.status(500).json(result);
  }
};

/* [DELETE] delete all */
const deleteAllAttendances = async (req, res) => {
  try {
    const data = await AttendanceService.deleteAll();
    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = { ...defaultResult, status: false, message: 'failed', error: error.message };
    return res.status(500).json(result);
  }
};

const getLastAttendance = async (req, res) => {
  try {
    const data = await AttendanceService.getLast();
    if (!data) throw new Error('No attendance records found');

    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      status: false,
      message: 'failed',
      error: error.message
    };
    return res.status(500).json(result);
  }
};

module.exports = {
  postAttendance,
  getAttendances,
  getAttendance,
  putUpdateAttendance,
  deleteAttendance,
  deleteAllAttendances,
  getLastAttendance
};
