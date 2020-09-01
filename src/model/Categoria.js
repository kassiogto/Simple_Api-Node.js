const { Model, DataTypes } = require('sequelize')


class Categoria extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notEmpty: true
                }
            },


        },{
            sequelize,
            tableName: 'categorias'
            
        })
    }

    static associate(models) {
        
        this.belongsTo(models.Admin, { foreignKey: 'admin_id', as: 'admin' });
        this.belongsToMany(models.Produto, { foreignKey: 'categoria_id', through: 'categoria_produtos'  ,as: 'produtos' });    
    }
}

module.exports = Categoria;