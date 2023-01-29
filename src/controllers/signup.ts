import USER from "../models/user"
import { Request ,Response } from "express"
import handleError from "../middleware/errorhandle"


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
        const data: object ={
            'district': req.body.district,
            'province' : req.body.province,
            'cell' : req.body.cell,
            'sector' : req.body.sector,

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
}
export default User