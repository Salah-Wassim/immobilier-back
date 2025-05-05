const Admin = require('../models').Admin;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordService = require('../services/password.service')
const AgentImmobilier = require('../models').AgentImmobilier;

exports.find_all_admin = (req, res, next) => {
    Admin.findAll({
        attributes: ['id', 'name', 'email'],
    })
    .then(data =>{
        if(data){
            return res.status(200).send({
                data : data,
                message : "All admin"
            })
        }
        else{
            return res.status(404).send({
                message : "Admon not found"
            })
        }
    })
    .catch(err => {
        console.error(err);
        return res.status(500).send({
            message : err
        })
    })
}

exports.find_one_admin = (req, res, next) => {
    const id = req.params.id

    if(!id){
        return res.status(400).send({message : `Id value ${id} cannot exist or type is incorrect`})
    }

    Admin.findOne({
        where : {
            id : id
        }
    })
    .then(data => {
        if(data){
            return res.status(200).send({
                data: data
            })
        }
        else{
            return res.status(404).send({
                message: "Admin not found"
            })
        }
    })
    .catch(err => {
        console.error(err);
        return res.status(500).send({
            message : err
        })
    })
}

exports.create_admin = async (req, res, next) => {

    const {name, email, password} = req.body;

    const findEmailRealtor = await AgentImmobilier.findOne({where : {email : email}})
    const findEmailAdmin = await Admin.findOne({where : {email : email}})

    if(findEmailRealtor || findEmailAdmin){
        return res.status(400).send({
            message : `L'adresse mail ${email} est déjà utilisé`
        })
    }   

    if(await passwordService.isPasswordUses(password)){
        return res.status(400).send({
            message : "Le mot de passe est déjà utilisé"
        })
    }

    let admin = {};

    admin = {
        name : name && typeof(name) === "string" ? name : "",
        email : email && typeof(email) === "string" ? email : "",
        password : password && typeof(password) === "string" ? password : ""
    }

    for(value in admin){
        if(!admin[value]){
            res.status(400).send({
                message : "Une erreur s'est produite"
            })
        }
    }

    passwordService.verifyPassword(password)
    .then(result => {
        if(result){
            admin.password = result
            Admin.create(admin)
            .then(adminCreated => {
                return res.status(201).json({
                    message: 'Admin created',
                    adminCreated: adminCreated
                })
            })
            .catch(err => {
                console.error(err)
                return res.status(500).send({
                    message : err
                })
            })
        }
        else{
            return res.status(400).json({message: "wrong password format"});
        }
    })
    .catch(err => {
        console.error(err);
        return res.status(500).send({
            message : err
        })
    })
}

exports.login_admin = (req, res, next) => {
    Admin.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(admin => {
        if(admin){
            bcrypt.compare(req.body.password, admin.password, (err, result) => {
                console.log(req.body.password, admin.password)
                if(err){
                    throw err
                }
                else if(result){
                    const token = jwt.sign({name: admin.name, email: admin.email}, process.env.SECRETADMIN, {expiresIn: '1h'})
                    res.status(200).send({token})
                }
                else{
                    return res.status(400).json({
                        message: 'Bad login/password'
                    })
                }
            })
        }
    })
    .catch(err => res.status(500).json(err))
}

exports.edit_admin = (req, res, next) => {
    const id = req.params.id;

    if(!id){
        res.status(400).send({message : `Id value ${id} cannot exist or type is incorrect`})
    }

    const {name, email} = req.body;

    let admin = {};

    admin = {
        name : name && typeof(name) === "string" ? name : "",
        email : email && typeof(email) === "string" ? email : ""
    }

    for(value in admin){
        if(!admin[value]){
            res.status(400).send({
                message : "Une erreur s'est produite"
            })
        }
    }

    Admin.update(admin, {
        where : {
            id : id
        }
    })
    .then(data => {
        if(data){
            res.status(200).send({
                data: data,
                message : "Admin was edited"
            })
        }
        else{
            res.status(400).send({
                message : "Une erreur s'est produite lors de la validation du formulaire"
            })
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send({
            message : err
        })
    })
}

exports.delete_admin = (req, res, next) => {
    const id = req.params.id;

    if(!id){
        res.status(400).send({message : `Id value ${id} cannot exist or type is incorrect`})
    }

    Admin.destroy({
        where : {
            id : id
        }
    })
    .then(() => {
        res.status(204).json({message: 'Admin deleted'})
    })
    .catch(err => {
        console.error(err);
        res.status(500).send({
            message : err
        })
    })
}