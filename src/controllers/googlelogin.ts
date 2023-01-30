import passport from "passport"
import USER from "../models/user"
import GoogleStrategy from "passport-google-oauth2"
import  {NextFunction, Request,Response,Router} from "express";


 passport.use(new GoogleStrategy.Strategy({
    clientID:     `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "http://127.0.0.1:5000/users",
    passReqToCallback   : true
  },
  async function(request:Request, accessToken: string, refreshToken: string, profile: any, done: any) {
    try {
   const user =  await USER.findOne({where :{ googleId: profile.id },attributes: { exclude: ['password'] }});
   if(!user){
    console.log(profile)
const foundUser ={
    firstName: profile.family_name,
    lastName: profile.given_name,
    email: profile.email,
    password: `${process.env.PASSWORDTOUSE}`,
    googleId: profile.id        
}
const createdUser = await USER.create(foundUser)
return  done(null ,createdUser)
   }        
   else{
    return done(null , user) 
   }
    } catch (error: any) {
        return  done(null ,error )
        
    }
  }
));

passport.serializeUser(function(user: any , done){
    done(null, user);
});

passport.deserializeUser(function(user: any , done){
    done(null, user);
});