const Avantage = require('../models').Avantage;

exports.list_avantage = (req, res, next) => {
    Avantage.findAll({
        attributes: ['id', 'name']
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => console.log(err))
}

exports.find_one_avantage = (req, res, next) => {
    const id = req.params.id

    Avantage.findByPk(id)
    .then(data => {
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(404).json({
                message : "Avantage not found"
            })
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

exports.create_avantage = (req, res, next) => {
    Avantage.create(req.body)
    .then(data => {
        if(req.body.title && typeof(req.body.title) === "string"){
            res.status(201).json({
                message: 'Avantage created',
                data: data
            })
        }
        else{
            res.status(201).json({
                message: 'Error : cannot created avantage',
            })
        }
    })
    .catch(err => res.status(400).json(err))
}

exports.edit_avantage = (req, res, next) => {
    Avantage.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        res.status(200).json({
            message: 'Avantage edited',
            data: data
        })
    })
    .catch(err => res.status(400).json(err))
}

exports.delete_avantage = (req, res, next) => {
    Avantage.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.status(204).json({message: 'Avantage deleted'})
    })
    .catch(err => res.status(400).json(err))
}
