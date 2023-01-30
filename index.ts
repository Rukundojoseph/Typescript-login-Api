import express, { Application } from "express"
import loginroutes from "./src/routes/authroutes"
import passportRoutes from "./src/routes/passportauth";
const app: Application = express()
const PORT = process.env.PORT || 5000;
import db from "./src/db/db"
app.use(express.json())

app.use(loginroutes)
app.use(passportRoutes)
db().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`app listening on port ${PORT}`)
    })
})