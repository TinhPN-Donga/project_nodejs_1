const {UserModel} = require('../models/index');

const findAll = () => {
    return UserModel.find();
}

const findById = (id) =>{
    return UserModel.findById(id);
}

const findByEmail = (email) =>{
    return UserModel.findOne({ email: email });
}

const create = (data) => {
    const newUser = new UserModel(data);
    return newUser.save();
}

const update  = (id, data) =>{
    return UserModel.updateOne({_id: id}, {$set: data});
}

const deleteAll = () =>{
    return UserModel.deleteMany();
}

const deleteById = (id) =>{
    return UserModel.findOneAndDelete({_id: id});
}

module.exports = {findAll, findById,create, update, deleteAll, deleteById, findByEmail}
