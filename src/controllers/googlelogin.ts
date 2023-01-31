import passport from "passport"
import USER from "../models/user"
import strategyGoogle from "passport-google-oauth2"
import  {Request} from "express";
import { VerifyCallback } from "jsonwebtoken";

const GoogleStrategy = strategyGoogle.Strategy
 passport.use(
    new GoogleStrategy({
    clientID:     `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "http://127.0.0.1:5000/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request:Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    try {
        
        //check if use already exists
   const user =  await USER.findOne({where :{ googleId: profile.id }});
   if(!user){

   type usert = {
    firstName: string,
    lastName: string ,
    email: string ,
    password: string,
    googleId: string      
   }
  const foundUser: usert ={
    firstName: `${profile.family_name}`,
    lastName: `${profile.given_name}` ,
    email: `${profile.email}` ,
    password: `${process.env.PASSWORDTOUSE}`,
    googleId: `${profile.id}`        
}
   // creating user and aadding the user to the data base
const createdUser = await USER.create(foundUser)
return  done(null ,createdUser)
   }        
   else{

    // return user if user already exists
    return done(null , user) 
   }
    } catch (error: any) {
        console.log(error)      
        
    }
  }
));

//these are you use for making sessions
passport.serializeUser(function(user: any , done){
    done(null, user);
});

passport.deserializeUser(function(user: any , done){
    done(null, user);
});