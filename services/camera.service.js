const { CameraModel } = require('../models');

const findAll = () => {
  return CameraModel.find();
};

const findById = (id) => {
  return CameraModel.findById(id);
};

const create = (data) => {
  const newCam = new CameraModel(data);
  return newCam.save();
};

const update = (id, data) => {
  return CameraModel.updateOne({ _id: id }, { $set: data });
};

const deleteAll = () => {
  return CameraModel.deleteMany();
};

const deleteById = (id) => {
  return CameraModel.findOneAndDelete({ _id: id });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteAll,
  deleteById,
};
