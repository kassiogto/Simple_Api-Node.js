const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

class Admin extends Model {
    static init(sequelize) {
        super.init({
            usuario: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notEmpty: true
                }
            },
           
            email: {
                type: DataTypes.STRING, 
                allowNull: false, 
                validate:{ 
                    notEmpty: true,
                    isEmail: { msg:'Esse campo precisa de um email'} 
                } 
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    notEmpty: true
                }
            }

        },{
            sequelize,
            hooks: {
                beforeCreate: (admin, options) => {
                    admin.password = admin.password && admin.password != "" ?  bcrypt.hashSync(admin.password, 8) : "";
                }
            }
        })
    }

    

  //  static associate(models) {
        //this.hasOne(models.Address, { foreignKey: 'user_id', as: 'address' });
        //this.hasMany(models.Booking, { foreignKey: 'user_id', as: 'booking' });
        
        //this.belongsToMany(models.Space, { foreignKey: 'user_id', through: 'book_spaces', as: 'spaces' })
        
   // }
}

module.exports = Admin;