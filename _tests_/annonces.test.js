const Annonce = require("../models").Annonce;
const AgentImmobilier = require('../models').AgentImmobilier;
const {list_annonce, create_annonce, edit_annonce, delete_annonce} = require('../controller/annonce.controller');
const Response = require('../utils/response.util.js');
const HttpStatus = require('../utils/httpStatus.util.js');

jest.mock("../models", () => ({
    Annonce: {
        findAll: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));

jest.mock("../utils/response.util.js");
  
jest.mock("../utils/httpStatus.util.js", () => ({
    OK: { code: 200, message: "OK" },
    NOT_FOUND: { code: 404, message: "Not Found" },
    BAD_REQUEST: { code: 400, message: "Bad request" },
    INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
    CREATED: { code : 201, message : "Created"},
    NO_CONTENT:{ code : 204, message : "NO_CONTENT"},
}));

describe('list_annonce', () => {
    let req, res;

    beforeEach(() => {
        req = { method: "GET", originalUrl: "/annonces" };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return a list of annonces from database', async () => {
        const annonces = [
            { 
                id: 1, 
                title: 'Test Annonce', 
                price: 1000, 
                description: 'Test description' 
            },
            { 
                id: 2, 
                title: 'Test Annonce 2', 
                price: 156156, 
                description: 'Test description 2' 
            }
        ];

        Annonce.findAll.mockResolvedValue(annonces);

        await list_annonce(req, res);
        
        expect(Annonce.findAll).toHaveBeenCalledWith({
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
        });
        expect(res.status).toHaveBeenCalledWith(HttpStatus.OK.code);
        expect(res.send).toHaveBeenCalledWith(
            new Response(HttpStatus.OK.code, HttpStatus.OK.message, 'Annonce retrieved', annonces)
        );
        expect(res.send).toHaveBeenCalledWith(new Response());
    });
});