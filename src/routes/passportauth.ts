import express, {Request,Response} from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import  "../controllers/googlelogin"

 const router = express.Router()

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
    console.log(User)
    if(!User){
        res.status(400).json({
            status: 400,
            message : "no user found"
        })
    }
    else{
        const email = User.email
        const userId = User.id
        res.status(200).json(
            {
                status: 200,
                message:  "logged in succesfuly",
                token: `${jwt.sign({email,userId}, process.env.SECRET_KEY as string)}`


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