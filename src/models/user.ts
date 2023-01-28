import { Sequelize, DataTypes } from "sequelize";
import {config} from 'dotenv';
import bcrypt from 'bcrypt'
config()
const sequelize = new Sequelize( `${process.env.DB_LINK}`,
{
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
    native:true
  }
} ) 

const  User = sequelize.define('User', {    
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value : string) {
            // Storing passwords in plaintext in the database is terrible.
            // Hashing the value with an appropriate cryptographic hash function is better.
            this.setDataValue('password', bcrypt.hashSync(value , bcrypt.genSaltSync()));
          }
      
    },
    cell: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sector: {
        type: DataTypes.STRING,
        allowNull: true,

    } ,
     district : {
        type: DataTypes.STRING,
        allowNull: false,
    },
      province: {
        type: DataTypes.STRING,
        allowNull: false,

    }
    
  }, {
    // Other model options go here
    timestamps: true,
    freezeTableName: true
  });
   
  User.sync()

  export default User 