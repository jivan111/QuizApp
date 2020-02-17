const express =require("express");
const bodyParser=require("body-parser")
const app=express()
const mongoquizmodel=require("./database/databaseModel.js")

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/sub",(req,res,next)=>{
  console.log("chlti hai  boss")
  next()
  
  })
  app.get("/",(req,res)=>{
    res.render("index")
  })
app.get("/quiz",(req,res)=>{
  mongoquizmodel.find((err,result)=>{
    if(err){
        console.log(err)

    }else{
      res.render("Quiz",{result:result})
      console.log("chlti hai 3 boss",result)
      
    }
})
 



})
app.get("/create",(req,res)=>{
  res.render("create")
})

app.get("/sub",(req,res)=>{
  console.log("server hit with some request ")
     res.render("submit")
})
app.post("/data",(req,res)=>{
     console.log(req.body,req.method)
})
app.listen( process.env.PORT || 3000,()=>{
    console.log("3000 running")
})