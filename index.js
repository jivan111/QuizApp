const express =require("express");
const app=express()
const mongoquizmodel=require("./database/databaseModel.js")

app.set("view engine","ejs")
app.use(express.static("public"))
app.get("/",(req,res)=>{
  arr=[]
  mongoquizmodel.find((err,result)=>{
    if(err){
        console.log(err)

    }else{
        result.forEach((item)=>{
          arr.push(item.question)
        })
    }
}).then(
  (result)=>{
  res.render("index",{result:result})
  }
).catch(err=>{
  console.log(err)
})

})
app.get("/sub",(req,res)=>{
  console.log("server hit with some request ")
     res.render("quizend")
})
app.listen("3000" || process.env.PORT,()=>{
    console.log("3000 running")
})