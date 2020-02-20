const express =require("express");
const bodyParser=require("body-parser")
const app=express()
const passport=require("passport")
const sessions =require("express-session")
const bcrypt=require("bcrypt")
// const methodOverride=require("method-override")
const flash=require("express-flash")
const localStrategy=require("passport-local").Strategy
const {quizModel,userModel}=require("./database/databaseModel.js")


app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(flash())
// app.use(methodOverride("_method"))
app.use(sessions({
  secret:"teri jaat ka",
  saveUninitialized:false,
  resave:false,
  // cookie:{maxAge:60000}
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(authenticateUser))
function cal(req,res,next){
  console.log("from cal")
  next()
}

function getUserWithId(id){
  return userModel.find({_id:id},(err,result)=>{
    if(err){
      console.log(err)
    }else{
      return result;
    }
  })
}
  app.get("/",(req,res)=>{
    res.render("index")
  })

app.get("/quiz",(req,res)=>{
  // quizModel.find((err,result)=>{
  //   if(err){
  //       console.log(err)

  //   }else{
    console.log("chlti hai 3 boss",req.isAuthenticated(),req.sessionID)
    
    res.render("Quiz",{result:app.get("result")})
  

})


app.get("/create",ifAuthenticated,(req,res)=>{
  res.render("create")
})
app.get("/login",ifNotAuthenticated,(req,res)=>{
  res.render("login")
})
app.get("/home",ifAuthenticated,(req,res)=>{
  res.render("dashboard")

})
app.get("/register",ifNotAuthenticated,(req,res)=>{
  res.render("register")
  
})

// app.delete("/logout",(req,res)=>{
//   req.logOut()
//   res.redirect("/")
// })
app.get("/logout",(req,res)=>{
  req.logOut()
  res.redirect("/")
})
// async function checkUserPassword(req,res,done){
//     const user=await findUser(req.body.username)
//     if(bcrypt.compare(req.body.password,user[0].password)){
//       console.log(req.body.password,"\n",user[0].password)
//        done(null,user)
  
//     }else{
//       res.redirect("/login")
//     }
//   }
passport.serializeUser((userdata,done)=>{
  console.log("from serialzeUser ",userdata)
  done(null,userdata[0]._id)
})
passport.deserializeUser(async(userid,done)=>{
  console.log("from deserializeUser ",userid)
return done(null,getUserWithId(userid))
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
     res.redirect("/home")
 }else{
   next()
 }
}
// this function is called to check credential matched  or not
async function  authenticateUser(email,password,done){
 let user=await findUser(email)
 console.log(user)
  if(user.length==0){
    console.log("no user found from localStrategy ")
   return  done(null,null,"no user found")
  }try{
  if(await bcrypt.compare(password,user[0].password)){
    console.log("compared from new localStrategy",email," ",password)
    done(null,user,"success")
  }else{
    console.log("failed to log in from localstrategy ",email," ",password)
    done(null,null,"wrong username or password")
  }
   
}catch(e){
   done(e)
}

}
// for registeration to check if username already exist 
async function checkIfUserExist(req,res,next){

    result=await findUser(req.body.username)
    console.log(result)
    if(result.length){
      res.redirect("/register")
      }else{
      
        let javascriptObj={}
        javascriptObj.username=req.body.username
        javascriptObj.name=req.body.name
        javascriptObj.password=await bcrypt.hash(req.body.password,10);
        userModel.insertMany(javascriptObj,(err)=>{
          if(err){
            res.send(err)
          }else{
            console.log(" inserted from register middleware ",req.body.password)
            next()
          }
        })
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
app.post("/register",checkIfUserExist,passport.authenticate("local",{successRedirect:"/home",failureRedirect:"/"}))
app.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),(req,res)=>{
  console.log(req.user,"from passport.authenticate()")
  res.redirect("/home")
})

app.get("/showQuiz",(req,res)=>{
  quizModel.find({},(err,result)=>{
    if(err){
      console.log("couldnot find data ",err)

    }else{
      let quizTitle=[]
      result.forEach((data)=>{
          quizTitle.push(data.title)
      })
      res.render("showQuiz",{quizTitle:quizTitle})
    }
  })
})
app.get("/showQuiz/:quiztitle",(req,res)=>{
      
  let title=req.params.quiztitle;
  quizModel.find({title:title},(err,result)=>{
    if(err){
      console.log("error while finding quiz based on title")
    }else{
         app.set("result",result)
         res.redirect("/quiz")
    }
  })

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
        let user=getUserWithId(req.session.passport.user)
        userModel.findOneAndUpdate({_id:req.session.passport.user},{$push:{quizCreated:req.body.title}},(err)=>{
        if(err){
          console.log(err)
        }else{
          console.log("title added successfuly ")
        }
          

        })


       }
     })

})
app.listen( process.env.PORT || 3000,()=>{
    console.log("3000 running")
})