const { AttendanceModel } = require('../models');  // ✔ FIXED

const findAll = () => {
  return AttendanceModel.find().sort({ createdAt: -1 });
};

const findById = (id) => {
  return AttendanceModel.findById(id);
};

const createAttendance = (data) => {
  const doc = new AttendanceModel(data);
  return doc.save();
};

const updateAttendance = (id, data) => {
  return AttendanceModel.updateOne({ _id: id }, { $set: data });
};

const deleteAll = () => {
  return AttendanceModel.deleteMany();
};

const deleteById = (id) => {
  return AttendanceModel.findOneAndDelete({ _id: id });
};

const getLast = () => {
  return AttendanceModel.findOne().sort({ createdAt: -1 });
};

module.exports = {
  findAll,
  findById,
  createAttendance,
  updateAttendance,
  deleteAll,
  deleteById,
  getLast,
};
