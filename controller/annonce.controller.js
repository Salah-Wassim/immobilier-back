const Annonce = require('../models').Annonce;
const AgentImmobilier = require('../models').AgentImmobilier;
const Bien = require('../models').Bien
const Avantage = require('../models').Avantage;
const KeyWord = require('../models').KeyWord;

// const Response = require('../utils/response.util.js');
// const HttpStatus = require('../utils/httpStatus.util.js');

exports.list_annonce = (req, res, next) => {
    Annonce.findAll({
        attributes: ['id', 'title', 'price', 'description'],
        include: [
            {
                model: AgentImmobilier,
            },
            {
                model: Bien
            },
            {
                model: Avantage
            },
            {
                model: KeyWord
            }
        ],
        order: [
            ['price', 'DESC']
        ]
    })
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => console.log(err))
}

exports.find_one_annonce = (req, res, next) => {
    const id = req.params.id

    Annonce.findOne({
        where : {id : id},
        include : [
            {
                model: AgentImmobilier,
            },
            {
                model: Bien
            },
            {
                model: Avantage
            },
            {
                model: KeyWord
            }
        ]
    })
    .then(data => {
        if(data){
            res.status(200).json(data)
        }
        else(
            res.status(404).json({
                message : "Annonce not found"
            })
        )
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

exports.create_annonce = async (req, res, next) => {
    try {
        const { title, price, secteur, nbRoom, description, avantageIds, keyWordIds, picture, AgentImmobilierId, BienId } = req.body;

        let annonceObject = {}

        annonceObject = {
            title: title && typeof(title)==="string" ? title : '',
            price: price && typeof(price)==="number" ? price : '',
            secteur: secteur && typeof(secteur)==="string" ? secteur : '',
            nbRoom: nbRoom && typeof(nbRoom)==="number" ? nbRoom : '',
            description: description && typeof(description)==="string" ? description : '',
            picture: picture && typeof(picture)==="string" ? picture : '',
            AgentImmobilierId: AgentImmobilierId && typeof(AgentImmobilierId)==="number" ? AgentImmobilierId : null,
            BienId: BienId && typeof(BienId)==="number" ? BienId : null
        }

        for(value in annonceObject){
            console.log(value, annonceObject[value])
            if(!annonceObject[value]){
                return res.status(401).json({
                    message : `All attributs must be filled or type of attributs is incorrect, ${value}: ${annonceObject[value]} , ${typeof(annonceObject[value])}`
                })
            }
        }

        const annonce = await Annonce.create(annonceObject);

        // Association des avantages
        if (avantageIds && avantageIds.length > 0) {
            const avantages = await Avantage.findAll({ where: { id: avantageIds } });
            await annonce.setAvantages(avantages);
        }

        // Association des keywords
        if (keyWordIds && keyWordIds.length > 0) {
            const keywords = await KeyWord.findAll({ where: { id: keyWordIds } });
            await annonce.setKeyWords(keywords);
        }

        res.status(201).json(annonce);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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
        res.status(200).json(data)
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