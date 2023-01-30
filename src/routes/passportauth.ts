import express, {Request,Response} from 'express'
import passport from 'passport'
import  "../controllers/googlelogin"

 const router = express.Router()

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/users',
        failureRedirect: '/login'
}));

router.get('/authenticate/google',
(req: Request,res: Response)=>{
    res.status(200).send('<a href="/auth/google">login with google</a>')
}
)

export default router 