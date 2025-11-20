const { CameraService } = require('../services');
const AttendanceService = require('../services/attendance.service');


const defaultResult = {
  message: 'success',
  error: null,
  status: true,
  result: null,
};

const getCameras = async (req, res) => {
  try {
    const data = await CameraService.findAll();
    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      error: error.message,
      status: false,
      message: 'failed',
    };
    return res.status(500).json(result);
  }
};


const getClass = async (req, res) => {
  try {
    const attendance = await AttendanceService.getLast(); // lấy bản ghi mới nhất
    return res.render('pages/class_page', { attendance });
  } catch (err) {
    console.error(err);
    return res.render('pages/class_page', { attendance: null });
  }
};

const getCamera = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CameraService.findById(id);
    if (!data) throw new Error('Camera not found');

    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      error: error.message,
      status: false,
      message: 'failed',
    };
    return res.status(500).json(result);
  }
};

const postCreateCamera = async (req, res) => {
  try {
    const data = await CameraService.create(req.body);
    const result = { ...defaultResult, result: data };
    return res.status(201).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      error: error.message,
      status: false,
      message: 'failed',
    };
    return res.status(500).json(result);
  }
};

const putUpdateCamera = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CameraService.update(id, req.body);
    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      error: error.message,
      status: false,
      message: 'failed',
    };
    return res.status(500).json(result);
  }
};

const deleteCamera = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await CameraService.deleteById(id);
    if (!data) throw new Error('Camera not found to delete');

    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      error: error.message,
      status: false,
      message: 'failed',
    };
    return res.status(500).json(result);
  }
};

const deleteAllCameras = async (req, res) => {
  try {
    const data = await CameraService.deleteAll();
    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      error: error.message,
      status: false,
      message: 'failed',
    };
    return res.status(500).json(result);
  }
};

module.exports = {
  getCameras,
  getCamera,
  postCreateCamera,
  putUpdateCamera,
  deleteCamera,
  deleteAllCameras,
  getClass
};
