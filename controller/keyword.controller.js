const KeyWord = require('../models').KeyWord;

exports.list_keyword = (req, res, next) => {
    KeyWord.findAll({})
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => console.log(err))
}

exports.create_keyword = (req, res, next) => {
    KeyWord.create(req.body)
    .then(data => {
        if(req.body.name && typeof(req.body.name) === "string"){
            res.status(201).json({
                message: 'Keyword created',
                data: data
            })
        }
        else{
            res.status(201).json({
                message: 'Error : cannot created keyword',
            })
        }
    })
    .catch(err => res.status(400).json(err))
}

exports.edit_keyword = (req, res, next) => {
    KeyWord.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        res.status(200).json({
            message: 'Keyword edited',
            data: data
        })
    })
    .catch(err => res.status(400).json(err))
}

exports.delete_keyword = (req, res, next) => {
    KeyWord.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.status(204).json({message: 'Keyword delted'})
    })
    .catch(err => res.status(400).json(err))
}
