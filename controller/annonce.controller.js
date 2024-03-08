const Annonce = require('../models').Annonce;
const AgentImmobilier = require('../models').AgentImmobilier;

exports.list_annonce = (req, res, next) => {
    Annonce.findAll({
        attributes: ['id', 'title', 'price', 'description'],
        include: [
            {
                model: AgentImmobilier,
                attributes: ['id', 'name']
            }
        ],
        order: [
            ['price', 'DESC']
        ]
    })
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => console.log(err))
}

exports.create_annonce = (req, res, next) => {
    Annonce.create(req.body)
    .then(data => {
        if(req.body.title && typeof(req.body.title) === "string"){
            res.status(201).json({
                message: 'annonce created',
                data: data
            })
        }
        else{
            res.status(201).json({
                message: 'Error : cannot created annonce',
            })
        }
    })
    .catch(err => console.log(err))
}

exports.edit_annonce = (req, res, next) => {
    Annonce.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        res.status(200).json({
            message: 'annonce edited',
            data: data
        })
    })
    .catch(err => res.status(400).json(err))
}

exports.delete_annonce = (req, res, next) => {
    Annonce.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.status(204).json({message: 'annonces delted'})
    })
    .catch(err => res.status(400).json(err))
}

exports.detail_annonce = (req, res, next) => {
    Annonce.findByPk(req.params.id)
    .then(data => {
        res.status(200).json({
            message: 'Detail of the annonce',
            data: data
        })
    })
    .catch(err => res.status(400).json(err))
}

exports.list_realtor_annonce = (req, res, next) => {
    Annonce.findAll({
        attributes: ['id', 'title', 'price', 'description'],
        includes: [
            {
                model: Realtor,
                attributes: ['id', 'name'],
                where: {
                    id: req.params.id
                }
            }
        ]
    })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => console.log(err))
}

exports.search_annonce = (req, res, next) => {
    const search =  `%${req.params.search}%`;
    Annonce.findAll({
        attributes: ['id', 'title', 'price', 'description'],
        include: [
            {
                model: AgentImmobilier,
                attributes: ['id', 'name']
            }
        ],
        where: {
            name: {
                [Op.like]: search
            },
        }
    })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => console.log(err))
}