const Bien = require('../models').Bien;
const { op } = require('sequelize');

exports.list_bien = (req, res, next) => {
    Bien.findAll({})
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => console.log(err))
}

exports.find_one_biens = (req, res, next) => {
    const id = req.params.id

    Bien.findByPk(id)
    .then(data => {
        if(data){
            res.status(200).json(data)
        }
        else(
            res.status(404).json({
                message : "Bien not found"
            })
        )
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

exports.create_bien = (req, res, next) => {
    Bien.create(req.body)
    .then(data => {
        if(req.body.name && typeof(req.body.name) === "string"){
            res.status(201).json({
                message: 'bien created',
                data: data
            })
        }
        else{
            res.status(201).json({
                message: 'Error : cannot created bien',
            })
        }
    })
    .catch(err => res.status(400).json(err))
}

exports.edit_bien = (req, res, next) => {
    Bien.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        res.status(200).json({
            message: 'bien edited',
            data: data
        })
    })
    .catch(err => res.status(400).json(err))
}

exports.delete_bien = (req, res, next) => {
    Bien.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.status(204).json({message: 'Bien delted'})
    })
    .catch(err => res.status(400).json(err))
}
