import jwt from "jsonwebtoken"

import { Request,Response,NextFunction } from "express"


class CheckUser{
    static async user(req:Request,res: Response,next: NextFunction){
        const loggedinuser = req.headers.authorization
        if(loggedinuser){
            if(loggedinuser.startsWith('Bearer')){
                const token = loggedinuser.split(" ")[1]
                const user = jwt.verify(token,`${process.env.SECRET_KEY}`)
                if(user){           
                    req.user = user         
                    next()
                }
                else{
                    res.status(404).json({
                        statusCode: 404,
                        message: "invalid token"
                    })
                }
            }
            else {
                res.status(404).json({
                    statusCode: 404,
                    message: "invalid token"
                })
            }
        }
        else{
            res.status(404).json(
                {
                    statusCode: 404,
                    message: "you dont have access."
                }
            )
        }

    }

}
export default CheckUser 