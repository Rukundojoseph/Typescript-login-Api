import USER from "../models/user"
import { Request ,Response } from "express"
import handleError from "../middleware/errorhandle"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import bcrypt from "bcrypt"

config()


function createjwt(userid: string , email: string ){
    const maxAge = 3 * 24 * 60 * 60;
    const token = jwt.sign({userid,email},`${process.env.SECRET_KEY}`, 
        {expiresIn: maxAge})
        return token

}

class User{
    static async createUser(req: Request, res: Response){
        try{
        const newuser= req.body   
       
       const newUser : any =  await USER.create(newuser) 
       res.status(200).json({
            statusCode: 200,
            message: "succesfuly created an account",
            data: {
               userID:  newUser.id,
               token: createjwt(newUser.id, newUser.email)
            }
                
 
        })
        }    
    catch(error: any){
        const message=handleError(error)
        res.status(400).json({
            statusCode: 400,
            message
        })

    }
    }
    static async getAlluser(req: Request ,res: Response){
        try {           
            const users : object = await USER.findAll({attributes: { exclude: ['password'] }})
            res.status(200).json({
                statuscode: 200,
                users
            })            
        } catch (error: any) {
            res.status(400).json({
                statusCode: 400,
                "message" : error.message
            })
        }
    }
    static async editlocation(req: Request ,res: Response){
        const userid: string = req.params.id;
        type billing ={
            'district': String,
            'province' : string,
            'cell' : string,
            'sector' : string,
            'street': string,
        }

        const data: billing ={
            'district': req.body.district,
            'province' : req.body.province,
            'cell' : req.body.cell,
            'sector' : req.body.sector,
            'street' : req.body.street,
        }
        try {
            await USER.update({ ...data },{
                where: {
                  id : userid
                }
              });
              const updatedUser: any = await USER.findByPk(userid) 
              res.status(200).json({
                "message" : "successfuly edited billing address",
                data:{
                    name: `${updatedUser.firstName} ${updatedUser.lastName}`,
                    email: updatedUser.email,
                    address: {
                        province: updatedUser.province,
                        district: updatedUser.district,
                        sector: updatedUser.sector,
                        cell: updatedUser.cell,                 
                    } 
                }
              })
            
        } catch (error: any) {
            
            res.status(400).json({
                statusCode: 400,
                "message" : error.message
            })
        }
    }
    //this is the login router to login 
    static async loginuser(req: Request ,res: Response){
        // add the login functionality here         
        const credentials = {
            email: req.body.email,
            password: req.body.password
        }        
        //get login credential from user 
        try{
            const user: any = await USER.findOne({where : {email : credentials.email}})
            if(user){
                // this is to verify the password of the user 
                if(bcrypt.compareSync(credentials.password,user.password)){
                    res.status(200).json({
                        message: "logged in succesfuly",
                        token: createjwt(user.id,user.email)
                    })

                }
                else{
                    res.status(400).json({
                        statusCode: 400,
                        message : "incorrect password"
                    })
                }
            }
            else{
                res.status(400).json({
                   statusCode: 400,
                   message: "email is not registered" 
                })
            }

            
        } catch (error) {
            
        }

    }
}
export default User