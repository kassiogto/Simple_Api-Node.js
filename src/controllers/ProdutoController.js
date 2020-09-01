const Produto = require('../model/Produto');
const Admin = require('../model/Admin');
const Categoria = require('../model/Categoria');


module.exports = {
    
    //criar produto
    async store(req, res) {
        try {
            const user_id = req.user_id
            const { nome, ref, valor, estoque, fotos, name_c } = req.body;

            const admin = await Admin.findByPk(user_id);

            if(!admin) { return res.status(400).json({ error: 'User not found' }) }        

            const produto = await Produto.create({
                nome,
                admin_id : user_id,
                ref, 
                valor
            })
            
            // cria ou procura a categoria
            const categoria = await Categoria.findByPk(name_c);

            //add o produto a categoria
            await produto.addCategoria(categoria);

            return res.json(produto);
            
        } catch (err) {
            
            return res.status(400).json({ error: 'falha ao criar produto', err}) 
        }

    },

    //listar produtos 
    async index(req, res) {

        try {
         
            const produto = await Produto.findAll({
                include: { association: 'categorias' }
            });

            return res.json(produto);
            
        } catch (err) {
            
            return res.status(400).json({ error: 'falha ao pesquisar', err})
        }

    },

    // add produto a uma categoria 
    async addCategoria(req, res) {

        try {
            const { produto_id, categoria_id } = req.params
            const produto = await Produto.findByPk(produto_id, {
                include: { association: 'categorias' }
            });
            const categoria = await Categoria.findByPk(categoria_id);

            if(!produto) {
                return res.status(400).json({ error: 'Produto nao encontrado' })
            }

            if(!categoria) {
                return res.status(400).json({ error: 'categoria nao encontrada' })
            }

            //add o produto a categoria
            await produto.addCategoria(categoria);

        
            return res.json(produto);
            
        } catch (err) {
            
            return res.status(400).json({ error: 'falha ao adicionar categoria', err})
        }
    },

    // atualizar produto
    async updateProduto(req, res) {

        try {

            const { nome, ref, valor } = req.body;
            const { produto_id } = req.params;

            const produto = await Produto.findByPk(produto_id)

            produto.update({
                nome,
                ref,
                valor
            })

            return res.json(produto)
            
        } catch (err) {
            
            return res.status(400).json({ error: 'falha ao atualizar produto', err})
        }
    },

    async deleteProduto(req, res) {
        try {

            const { produto_id } = req.params;

            const produto = await Produto.findByPk(produto_id);

            produto.destroy();

            
        } catch (err) {
            
            return res.status(400).json({ error: 'falha ao deletar produto', err})
        }
    }



}