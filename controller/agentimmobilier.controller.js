const AgentImmobilier = require('../models').AgentImmobilier;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordService = require('../services/password.service')

exports.list_realtor = (req, res, next) => {
    AgentImmobilier.findAll({
        attributes: ['id', 'name'],
    })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => console.log(err))
}

exports.create_realtor = (req, res, next) => {
    passwordService.verifyPassword(req.body.password)
    .then(result => {
        if(result){
            let realtor = req.body;
            realtor.password = result
            AgentImmobilier.create(realtor)
            .then(realtorCreated => {
                res.status(201).json({
                    message: 'Realtor created',
                    realtorCreated: realtorCreated
                })
            })
            .catch(err => res.status(400).json(err))
        }
        else{
            res.status(400).json({message: "wrong password format"})
        }
    })
    .catch(err => console.log(err))
}

exports.login_realtor = (req, res, next) => {
    AgentImmobilier.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(realtor => {
        if(realtor){
            bcrypt.compare(req.body.password, realtor.password, (err, result) => {
                if(err){
                    throw err
                }
                else if(result){
                    const token = jwt.sign({name: realtor.name, email: realtor.email}, process.env.SECRETREALTOR, {expiresIn: '23h'})
                    res.status(200).json({
                        token: token
                    })
                }
                else{
                    res.status(400).json({
                        message: 'Bad name and or password'
                    })
                }
            })
        }
    })
    .catch(err => res.status(500).json(err))
}

exports.delete_realtor = (req, res, next) => {
    AgentImmobilier.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.status(204).json({message: "realtor deleted"})
    })
    .catch(err => console.log(err))
}