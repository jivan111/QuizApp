const express =require("express");
const bodyParser=require("body-parser")
const app=express()
const passport=require("passport")
const session =require("express-session")
const bcrypt=require("bcrypt")
const localStrategy=require("passport-local").Strategy
const {quizModel,userModel}=require("./database/databaseModel.js")


app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
  secret:"teri jaat ka",
  saveUninitialized:false,
  resave:false,
  cookie:{maxAge:60000}
}))
app.use(passport.initialize())
app.use(passport.session())
// passport.use(new localStrategy(checkUserPassword))
passport.use(new localStrategy(authenticateUser))


function getUserWithId(_id){
  return userModel.find({_id:_id},(err,result)=>{
    if(err){
      console.log(err)
    }else{
      return result;
    }
  })
}
  app.get("/",(req,res)=>{
    res.render("index")
    console.log(req.isAuthenticated())
  })

app.get("/quiz",ifAuthenticated,(req,res)=>{
  quizModel.find((err,result)=>{
    if(err){
        console.log(err)

    }else{
      res.render("Quiz",{result:result})
      console.log("chlti hai 3 boss",req.isAuthenticated(),result)
      
    }
})
})
function ifAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    next()
  }else{
    res.redirect("/login")
  }
}
function ifNotAuthenticated(req,res,next){
 if(req.isAuthenticated()){
     res.redirect("/")
 }else{
   next()
 }
}
app.get("/create",ifAuthenticated,(req,res)=>{
  res.render("create")
})
app.get("/login",ifNotAuthenticated,(req,res)=>{
  res.render("login")
})
app.get("/register",(req,res)=>{
  res.render("register")
})
app.post("/login",passport.authenticate("local",{successRedirect:"/quiz",failureRedirect:"/login",failureMessage:"couldnot authenticate"}))
// async function checkUserPassword(req,res,done){
//     const user=await findUser(req.body.username)
//     if(bcrypt.compare(req.body.password,user[0].password)){
//       console.log(req.body.password,"\n",user[0].password)
//        done(null,user)
  
//     }else{
//       res.redirect("/login")
//     }
//   }
passport.serializeUser((user,done)=>{
  done(null,user)
})
passport.deserializeUser(async(user,done)=>{
return done(null,user)
})
async function  authenticateUser(email,password,done){
  user=await findUser(email)
  if(user==null){
   return  done(null,null,"no user found")
  }try{
  if(await bcrypt.compare(password,user[0].password)){
    console.log("compared")
    done(null,user,"success")
  }else{
    done(null,null,"wrong username or password")
  }
   
}catch(e){
   done(e)
}

}

 function  findUser(username){
   return userModel.find({username:username},(err,result)=>{
          if(err)
          console.log(err)
          else{

            return result
          }
 })
}
app.post("/register",async (req,res)=>{
  result=await findUser(req.body.username)
  console.log(result)
  if(result.length){
    res.redirect("/register")
    }else{
      password=req.body.password;
      password=await bcrypt.hash(password,10)
      javascriptObj=req.body
      javascriptObj.password=password;
      userModel.insertMany(javascriptObj,(err)=>{
        if(err){
          res.send(err)
        }else{
          res.redirect("/")
        }
      })
    }
})
app.get("/sub",(req,res)=>{
  console.log("server hit with some request ")
     res.render("submit")
})
app.post("/data",(req,res)=>{

     quizModel.insertMany(req.body,(err)=>{
       if(err){
     res.send("couldn't create Quiz")
      }else{
        console.log("inserted")
         res.status(200).send("gfbxgbfx")

       }
     })

})
app.listen( process.env.PORT || 3000,()=>{
    console.log("3000 running")
})