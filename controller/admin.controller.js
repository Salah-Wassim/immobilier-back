const Admin = require('../models').Admin;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordService = require('../services/password.service')

exports.create_admin = (req, res, next) => {
    passwordService.verifyPassword(req.body.password)
    .then(result => {
        if(result){
            let admin = req.body;
            admin.password = result
            Admin.create(admin)
            .then(adminCreated => {
                res.status(201).json({
                    message: 'Admin created',
                    adminCreated: adminCreated
                })
            })
            .catch(err => res.status(401).json(err))
        }
        else{
            res.status(401).json({message: "wrong password format"});
        }
    })
    .catch(err => console.log(err))
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
                    res.status(200).json({
                        token: token
                    })
                }
                else{
                    res.status(400).json({
                        message: 'Bad login/password'
                    })
                }
            })
        }
    })
    .catch(err => res.status(500).json(err))
}