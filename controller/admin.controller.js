const Admin = require('../models').Admin;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordService = require('../services/password.service')
const AgentImmobilier = require('../models').AgentImmobilier;
const jwtDecode = require('../services/jwt-decode')

exports.me = (req, res, next) => {
    try{
        return jwtDecode.jwt_decode_admin(req, res)
    }
    catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}

exports.find_all_admin = (req, res, next) => {
    Admin.findAll({
        attributes: ['id', 'name', 'email'],
    })
    .then(data =>{
        if(data){
            return res.status(200).json(data)
        }
        else{
            return res.status(404).json({
                message : "Admins not found"
            })
        }
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({
            message : err
        })
    })
}

exports.find_one_admin = (req, res, next) => {
    const id = req.params.id

    if(!id){
        return res.status(400).json({message : `Id value ${id} cannot exist or type is incorrect`})
    }

    Admin.findOne({
        where : {
            id : id
        }
    })
    .then(data => {
        if(data){
            return res.status(200).json(data)
        }
        else{
            return res.status(404).json({
                message: "Admin not found"
            })
        }
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({
            message : err
        })
    })
}

exports.create_admin = async (req, res, next) => {

    const {name, email, password, roleAdmin} = req.body;

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

    let admin = {};

    admin = {
        name : name && typeof(name) === "string" ? name : "",
        email : email && typeof(email) === "string" ? email : "",
        password : password && typeof(password) === "string" ? password : "",
        roleAdmin : roleAdmin && typeof(roleAdmin) === 'string' ? roleAdmin : "true"
    }

    for(value in admin){
        if(!admin[value]){
            res.status(400).json({
                message : "Une erreur s'est produite"
            })
        }
    }

    passwordService.verifyPassword(password)
    .then(hash => {
        if(hash){
            admin.password = hash
            Admin.create(admin)
            .then(admin => {
                const accessToken = jwt.sign({
                    id : admin.id,
                    email : admin.email,
                    roleAdmin: admin.roleAdmin
                }, process.env.SECRETADMIN, {expiresIn: process.env.EXPIRES_IN})
                return res.status(201).json({
                    message: 'Admin created',
                    adminCreated: admin,
                    accessToken : accessToken
                })
            })
            .catch(err => {
                console.error(err)
                return res.status(500).json({
                    message : err
                })
            })
        }
        else{
            return res.status(400).json({message: "Le format du mot de passe est incorrecte"});
        }
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({
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
                    const token = jwt.sign({id: admin.id, email: admin.email, roleAdmin: admin.roleAdmin}, process.env.SECRETADMIN, {expiresIn: process.env.EXPIRES_IN})
                    res.status(200).send({token})
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

exports.edit_admin = (req, res, next) => {
    const id = req.params.id;

    if(!id){
        return res.status(400).json({message : `Id value ${id} cannot exist or type is incorrect`})
    }

    const adminIdConnected = req.admin.id;

    if(id !== adminIdConnected.toString()){
        return res.status(403).send({
            message : "Vous ne pouvez pas modifié ce profil"
        })
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
            res.status(200).json({
                data: data,
                message : "Admin was edited"
            })
        }
        else{
            res.status(400).json({
                message : "Une erreur s'est produite lors de la validation du formulaire"
            })
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            message : err
        })
    })
}

exports.delete_admin = (req, res, next) => {
    const id = req.params.id;

    if(!id){
        res.status(400).json({message : `Id value ${id} cannot exist or type is incorrect`})
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
        res.status(500).json({
            message : err
        })
    })
}