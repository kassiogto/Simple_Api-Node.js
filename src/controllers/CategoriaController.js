const Categoria = require('../model/Categoria');
const Admin = require('../model/Admin');

module.exports = {

    // criar categoria
    async store(req, res) {
        try {
            const user_id = req.user_id
            const { nome } = req.body;

            const admin = await Admin.findByPk(user_id);

            if(!admin) { return res.status(400).json({ error: 'usuario nao encontrado' }) }

            const categoria = await Categoria.create({
                nome,
                admin_id : user_id
            })

            return res.json(categoria);
            
        } catch (err) {
            
            return res.status(400).json({ error: 'falha ao criar categoria', err}) 
        }

    },

    async index(req, res) {
        try {
            const categoria = await Categoria.findAll({ 
                attributes:{ exclude: ['admin_id', 'id', 'createdAt', 'updatedAt' ]},
                include: { association: 'produtos' }
            });

            return res.json(categoria)

        } catch (err) {
            
            return res.status(400).json({ error: 'falha ao pesquisar', err})
        }
    },
    async updateCategoria (req, res) {
        try {
            const  categoria_id  = req.params.categoria_id;
            const { nome } = req.body;

            const categoria = await Categoria.findByPk(categoria_id);

            categoria.update({
                nome
            })

            return res.json(categoria);
            
        } catch (err) {
            
            return res.status(400).json({ error: 'falha no update', err})
        }
    }, 

    async deleteCategoria(req, res) {
        const  categoria_id  = req.params.categoria_id;

        const categoria = await Categoria.findByPk(categoria_id);

        categoria.destroy()

        return res.json({ msg: 'Deletado men' })
    }
};