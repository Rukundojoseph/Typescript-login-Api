import express, {Request,Response} from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import  "../controllers/googlelogin"

 const router = express.Router()
 function createjwt(userid: string , email: string ){
    const maxAge = 3 * 24 * 60 * 60;
    const token = jwt.sign({userid,email},`${process.env.SECRET_KEY}`, 
        {expiresIn: maxAge})
        return token
}

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/loggedin',
        failureRedirect: '/failed'
}));

router.get('/loggedin', async (req: Request,res: Response)=>{
    const User: any = req.user    
    if(!User){
        res.status(400).json({
            status: 400,
            message : "no user found"
        })
    }
    else{
        const email = User.email
        const userid = User.id
        res.status(200).json(
            {
                statusCode: 200,
                message:  "logged in succesfuly",
                token: createjwt(userid,email)
            }
        )
    }
})

router.get('/authenticate/google',
(req: Request,res: Response)=>{
    res.status(200).send('<a href="/auth/google">login with google</a>')
}
)

export default router 