import USER from "../models/user"
import { Request ,Response } from "express"


class User{
    static async createUser(req: Request, res: Response){
        try{
        const newuser= req.body    
        
       const newUser : any =  await USER.create(newuser)   
       
        res.status(200).json({
            message: "succesfuly created an account",
            data: {
               userID:  newUser.id
            }
                
 
        })

    }    
    catch(error){
        console.log(error)

    }

    }
    static async getAlluser(req: Request ,res: Response){
        try {
            const users : object = await USER.findAll({attributes: { exclude: ['password'] }})

            res.status(200).json({
                statuscode: 200,
                users
            })            
        } catch (error) {
            console.log(error)
        }
    }
    static async editlocation(req: Request ,res: Response){
        const userid: string = req.params.id;
        const data: object ={
            'district': req.body.district,
            'province' : req.body.province,
            'cell' : req.body.province,
            'sector' : req.body.province,

        }
        try {
            await USER.update({ ...data },{
                where: {
                  id : userid
                }
              });
              res.status(200).json({
                "message" : "successfuly edited billing address"
              })
            
        } catch (error) {
            console.log(error)            
        }
    }
}
export default User