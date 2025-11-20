const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const AttendanceSchema = new Schema(
  {
    // Tổng số sinh viên trong lớp
    total: {
      type: Number,
      required: true,
    },

    // Số lượng sinh viên có mặt
    present: {
      type: Number,
      required: true,
    },

    // Danh sách sinh viên vắng (có thể là tên hoặc mã SV)
    absent: {
      type: [String],
      default: [],
    },
    // Ảnh lúc điểm danh: có thể là URL, path, hoặc base64
    image: {
      type: String,
      default: '',
    },

    // (Option) nếu muốn gắn theo camera hoặc lớp:
    // cameraId: { type: Schema.Types.ObjectId, ref: 'Camera' },
    // className: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = model('Attendance', AttendanceSchema);
