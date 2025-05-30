const AgentImmobilier = require('../models').AgentImmobilier;
const Admin = require('../models').Admin;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordService = require('../services/password.service')
const jwtDecode = require('../services/jwt-decode')

exports.me = (res, req, next) => {
    try{
        return jwtDecode.jwt_decode_realtor(req, res)
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

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

exports.create_realtor = async (req, res, next) => {

    const {name, age, email, password, picture, phoneNumber, roleAdmin} = req.body;

    const findEmailRealtor = await AgentImmobilier.findOne({where : {email : email}})
    const findEmailAdmin = await Admin.findOne({where : {email : email}})

    if(findEmailRealtor || findEmailAdmin){
        return res.status(400).json({
            message : `L'adresse mail ${email} est déjà utilisé`
        })
    }   

    if(await passwordService.isPasswordUses(password)){
        return res.status(400).json({
            message : "Ce mot de passe est trop faible ou compromis. Veuillez en choisir un plus robuste."
        })
    }

    let realtor = {};

    realtor = {
        name : name && typeof(name) === 'string' ? name : "",
        age : age && typeof(age) === 'number' ? age : "",
        email : email && typeof(email) === 'string' ? email : "",
        password : password && typeof(password) === 'string' ? password : "",
        picture : picture && typeof(picture) === 'string' ? picture : "Aucune photo",
        phoneNumber : phoneNumber && typeof(phoneNumber) === 'number' ? phoneNumber : "",
        roleAdmin : roleAdmin && typeof(roleAdmin) === 'string' ? roleAdmin : "false"
    }

    for(value in realtor){
        if(!realtor[value]){
            return res.status(400).json({
                message : `Une erreur s'est produite : ${realtor[value]}`
            })
        }
    }

    passwordService.verifyPassword(req.body.password)
    .then(hash => {
        if(hash){
            realtor.password = hash
            AgentImmobilier.create(realtor)
            .then(realtor => {
                const accessToken = jwt.sign({
                    id: realtor.id,
                    email: realtor.email,
                    roleAdmin: realtor.roleAdmin
                }, process.env.SECRETREALTOR, { expiresIn:process.env.EXPIRES_IN});
                return res.status(201).json({
                    message: 'Realtor created',
                    realtorCreated: realtor,
                    accessToken : accessToken
                })
            })
            .catch(err => {
                console.error(err)
                return res.status(400).json({message : err})
            })
        }
        else{
            return res.status(400).json({message: "Le format du mot de passe est incorrecte"})
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({message : err})
    })
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
                    const token = jwt.sign({id: realtor.id, email: realtor.email, roleAdmin: realtor.roleAdmin}, process.env.SECRETREALTOR, {expiresIn: process.env.EXPIRES_IN})
                    return res.status(200).json({
                        token: token
                    })
                }
                else{
                    return res.status(400).json({
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

    if(id !== realtorIdConnected.toString()){
        return res.status(403).send({
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