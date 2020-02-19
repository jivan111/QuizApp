const express=require("express")
const app=express()
const session=require("express-session")
app.use(session({
    secret:"hey sexy",
    resave:true,
    saveUninitialized:true
}))
app.get("/",(req,res)=>{
    
   
    res.send(req.session)

})


app.listen("3000",()=>{
    console.log("listening")
})