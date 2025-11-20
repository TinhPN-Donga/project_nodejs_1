const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CameraSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    typeCamera: {
      type: String,
      default: '',
      trim: true,
    },

    userCamera: {
      type: String,
      default: '',
      trim: true,
    },

    passCamera: {
      type: String,
      default: '',
    },

    listStudent: {
      type: [String],  // danh sách mã SV hoặc tên SV
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model('Camera', CameraSchema);
