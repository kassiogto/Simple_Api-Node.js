const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');
const bcryt = require('bcryptjs');

const authConfig = require('../config/auth')

function generateToken(params ={}) {
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 86400
    })
}


module.exports = {
    // criar admin
    async store(req, res) {
        try {
            const { usuario, password, email } = req.body

            const admin = await Admin.create({usuario, password, email});
            admin.password = undefined;

            return res.json(admin);
            
        } catch (err) {
            
            return res.status(400).json({ error: 'Registration Failed', err}) 
        }
    },

    // mostrar admins
    async show(req, res) {
        try {
            const admin = await Admin.findAll({ 
                attributes:{ exclude: ['password', 'createdAt', 'updatedAt' ]},
            });

            return res.json(admin)
        } catch(err) {
            
            return res.status(400).send({ error: 'Search failed', err}) 
        }
    },

    // authenticate admin
    async authe(req, res) {
        try {
            const { email, password } = req.body

            const admin = await Admin.findOne({ where: {email: email} })

            if(!admin) {
                return res.status(400).json({ error: 'User not found' })
            }
            
            if(!await bcryt.compare(password, admin.password))
                return res.status(400).json({ error: 'Invalid password' })

            admin.password = undefined

            return res.json({
                admin,
                token: generateToken({ id: admin.id })
            })
            
        } catch (err) {
            
            return res.status(400).send({ error: 'Registration Failed', err })
            
        }
    }
}