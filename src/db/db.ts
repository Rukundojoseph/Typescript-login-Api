import { Sequelize } from "sequelize";
import { config } from "dotenv";
config()

const sequelize = new Sequelize( `${process.env.DB_LINK}`,
{
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
    native:true
  }
}
 ) 

const connectdb= async () =>{
    try {
        await sequelize.authenticate();
        console.log('you have succefully connected to the data base .');        
        
      } catch (error) {
        console.error('failed to connect to the database :', error);
      }
}

export default connectdb