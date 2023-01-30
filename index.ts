import express, { Application } from "express"
import loginroutes from "./src/routes/authroutes"
import passportRoutes from "./src/routes/passportauth";
import passport from "passport"
import session from "express-session"
import { config } from "dotenv";
config()
const app: Application = express()
const PORT = process.env.PORT || 5000;
import db from "./src/db/db"
app.use(express.json())
app.use(session({
    secret: `${process.env.SECRET_SESSION}`,
    resave: false,
    saveUninitialized: true,
    cookie : {secure : true}
}))
app.use (passport.initialize())
app.use(passport.session())
app.use(loginroutes)
app.use(passportRoutes)
db().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`app listening on port ${PORT}`)
    })
})