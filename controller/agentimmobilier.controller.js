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

exports.list_one_realtor = (req, res, next) => {
    const id = req.params.id;

    if(!id){
        res.status(400).send({message : `Id value ${id} cannot exist or type is incorrect`})
    }

    AgentImmobilier.findOne({
        where: {
            id : id
        }
    })
    .then(data => {
        if(data){
            res.status(200).send(data)
        }
        else{
            res.status(404).send({
                message: "Realtor no found"
            })
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send(err)
    })

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
                    const token = jwt.sign({name: realtor.name, email: realtor.email}, process.env.SECRETREALTOR, {expiresIn: '1h'})
                    res.status(200).json({
                        token: token
                    })
                }
                else{
                    res.status(400).json({
                        message: 'L\'adresse email ou le mot de passe est incorrecte'
                    })
                }
            })
        }
    })
    .catch(err => res.status(500).json(err))
}

exports.edit_realtor = (req, res, next) => {
    const id = req.params.id

    const {name, age, email, phoneNumber} = req.body

    if(!id){
        res.status(400).send({message : `Id value ${id} cannot exist or type is incorrect`})
    }

    const realtorIdConnected = req.realtor.id

    if(id !== realtorIdConnected){
        return res.status(401).send({
            message : "Vous ne pouvez pas modifié ce profil"
        })
    }

    let realtor = {}

    realtor = {
        name : name && typeof(name) === "string" ? name : "",
        age : age && typeof(age) === 'number' ? age : "",
        email : email && typeof(email) === "string" ? email : "",
        phoneNumber : phoneNumber && typeof(phoneNumber) === "number" ? phoneNumber : ""
    }

    for(value in realtor){
        if(!realtor[value]){
            res.status(400).send({
                message : "Une erreur s'est produite"
            })
        }
    }

    AgentImmobilier.update(realtor, {
        where : {
            id : id
        }
    })
    .then((data) => {
        if(data){
            res.status(200).send({
                message: 'Realtor edited'
            })
        }
        else{
            res.status(404).send({
                message : "Realtor no found"
            })
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).send(err)
    })
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