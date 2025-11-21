// controllers/attendance.controller.js
const fs = require('fs');
const path = require('path');
const AttendanceService = require('../services/attendance.service');

const ATTENDANCE_UPLOAD_DIR = path.join(
  __dirname,
  '..',
  'public',
  'uploads',
  'attendance'
);

// Tạo thư mục lưu ảnh nếu chưa tồn tại
if (!fs.existsSync(ATTENDANCE_UPLOAD_DIR)) {
  fs.mkdirSync(ATTENDANCE_UPLOAD_DIR, { recursive: true });
}

const defaultResult = {
  message: 'success',
  error: null,
  status: true,
  result: null,
};

/**
 * Chuẩn hóa last_update từ client (number/string) => Date
 */
function normalizeLastUpdate(value) {
  if (!value) return new Date();

  if (typeof value === 'number') {
    // nếu nhỏ hơn 1e12: khả năng là giây
    if (value < 1e12) {
      return new Date(value * 1000);
    }
    // còn lại coi như mili giây
    return new Date(value);
  }

  if (typeof value === 'string') {
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d;
  }

  return new Date();
}

/**
 * Lưu ảnh base64 xuống /public/uploads/attendance
 * @param {string} dataUrl - "data:image/jpeg;base64,..."
 * @returns {string|null} - "/uploads/attendance/xxx.jpg"
 */
function saveBase64Image(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') return null;

  let base64String = dataUrl;
  let ext = 'jpg';

  const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (match) {
    const mime = match[1]; // "image/jpeg", "image/png", ...
    base64String = match[2];

    if (mime === 'image/png') ext = 'png';
    else if (mime === 'image/jpeg' || mime === 'image/jpg') ext = 'jpg';
  }

  const fileName = `attendance_${Date.now()}.${ext}`;
  const filePath = path.join(ATTENDANCE_UPLOAD_DIR, fileName);

  fs.writeFileSync(filePath, base64String, 'base64');

  return `/uploads/attendance/${fileName}`;
}

/* [POST] create attendance */
const postAttendance = async (req, res) => {
  try {
    const body = { ...req.body };

    // Chuẩn hóa last_update
    body.last_update = normalizeLastUpdate(body.last_update);

    // Xử lý image base64 nếu có
    if (body.image) {
      try {
        const savedPath = saveBase64Image(body.image);
        if (savedPath) {
          body.image = savedPath; // chỉ lưu path vào DB
        }
      } catch (e) {
        console.error('Save attendance image error:', e);
        body.image = '';
      }
    }

    const data = await AttendanceService.createAttendance(body);
    const result = { ...defaultResult, result: data };
    return res.status(201).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      status: false,
      message: 'failed',
      error: error.message,
    };
    return res.status(500).json(result);
  }
};

/* [GET] get all attendance records */
const getAttendances = async (req, res) => {
  try {
    const data = await AttendanceService.findAll();
    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      status: false,
      message: 'failed',
      error: error.message,
    };
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
    const result = {
      ...defaultResult,
      status: false,
      message: 'failed',
      error: error.message,
    };
    return res.status(500).json(result);
  }
};

/* [PUT] update record */
const putUpdateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };

    // Nếu client gửi last_update mới
    if (body.last_update) {
      body.last_update = normalizeLastUpdate(body.last_update);
    }

    // Nếu update luôn image dạng base64
    if (body.image && body.image.startsWith('data:image')) {
      try {
        const savedPath = saveBase64Image(body.image);
        if (savedPath) {
          body.image = savedPath;
        }
      } catch (e) {
        console.error('Update attendance image error:', e);
        delete body.image; // hoặc set rỗng tùy bạn
      }
    }

    const data = await AttendanceService.updateAttendance(id, body);
    const result = { ...defaultResult, result: data };
    return res.status(200).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      status: false,
      message: 'failed',
      error: error.message,
    };
    return res.status(500).json(result);
  }
};

/* [DELETE] delete one */
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await AttendanceService.findById(id);
    if (!data) throw new Error('Record not found to delete');

    // Option: xóa file ảnh trên ổ đĩa nếu muốn
    if (data.image && typeof data.image === 'string') {
      const imgPath = path.join(__dirname, '..', 'public', data.image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    const deleted = await AttendanceService.deleteById(id);

    const result = { ...defaultResult, result: deleted };
    return res.status(200).json(result);
  } catch (error) {
    const result = {
      ...defaultResult,
      status: false,
      message: 'failed',
      error: error.message,
    };
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
    const result = {
      ...defaultResult,
      status: false,
      message: 'failed',
      error: error.message,
    };
    return res.status(500).json(result);
  }
};

/* [GET] get last attendance record */
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
      error: error.message,
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
  getLastAttendance,
};
