const { Model, DataTypes } = require('sequelize')


class Produto extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notEmpty: true
                }
            },

            ref: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notEmpty: true
                }
            },
            valor: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate:{
                    notEmpty: true
                }
            },

        },{
            sequelize,
            tableName: 'produtos'
            
        })
    }

    static associate(models) {
        this.belongsTo(models.Admin, { foreignKey: 'admin_id', as: 'admin' });
        this.belongsToMany(models.Categoria, { foreignKey: 'produto_id', through: 'categoria_produtos'  ,as: 'categorias' });
        
    }
}

module.exports = Produto;