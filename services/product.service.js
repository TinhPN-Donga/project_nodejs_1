const {ProductModel} = require('../models/index');

const findAll = () =>{
    return ProductModel.find();
}

const findById = (id) =>{
    return ProductModel.findById(id);
}

const create = (body) => {
    const newProduct = new ProductModel(body);
    return newProduct.save();
}

const update = (id,body) =>{
    return ProductModel.updateOne({_id: id}, {$set: data});
}

const deleteAll = () =>{
    return ProductModel.deleteMany();
}

const deleteById = (id) =>{
    return ProductModel.findOneAndDelete({_id: id});
}


module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteAll,
    deleteById
}