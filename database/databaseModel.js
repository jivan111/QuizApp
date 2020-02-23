const mongoose=require("mongoose")

const localUrl="mongodb://localhost:27017/Quizdb"
mongoose.connect(localUrl,{useNewUrlParser:true,useUnifiedTopology: true } )
//this is redundant as database is opened as soon as its connected
// it is used if we  wan to initialise as soon as connection to database is established
// mongoose.connection
//  .once("open",()=>{
//      console.log("opened")

//  })
//  .on("error",()=>{
//      console.log("error")
//  })
const Schema = mongoose.Schema;

const quizSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    question:[{
        type:String,
        required:true
    }],
    options:[{type:Object,required:true}],
    correctOption:[{
        type:String,
        required:true
    }]

})

const quizModel=mongoose.model("Quiz",quizSchema)
// q1="what is your name kfmfknnnnnnn nnnnnnnnn nnnnnnnnnnnnnnkfmfknnnnnnn nnnnnnnnn nnnnnnnnnnnnnn kfmfknnnnnnn nnnnnnnnn nnnnnnnnnnnnnn vvvvvvv vvvvvvvvvvvv vvvvvvvvvvvvvvvv vvvvvvv vvvvvvvvvv nnnnnnnnnnnnn nnnnvnjfv?"
// q2="fuck your question?"
// q3="hey ,father name bata re gandu ?"



        
//   i1= { title:"random",
//       question:[q1,q2,q3],
//  options:[{
//      a:"bhdjfsdn",
//      b:"nkfnfkj",
//      c:"sdfjndjfnf",
//      d:"nfkfjrnk"
//  },{
//      a:"wklmwekf",
//      b:"knwfjenfej",
//      c:"fnenkfjkwejn",
//      d:"kfnekfweo"
//  } ,
//  {
//      a:"sdkdnckdnc",
//      b:"dknjfkjnfwe",
//      c:"kjfnkwejnfj",
//      d:"kjkjhgsrj"
//  } ],
//  correctOption: ["nkfnfkj", "kfnekfweo","dknjfkjnfwe"]}
//  quizModel.insertMany(i1,(err)=>{
//      if(err)
//        console.log(err)
//     else
//       console.log("success hai boss")   
//  })       
 
 
//other collection for user


const userSchema=new Schema({

    name:{
        type:String,
        required:true
    },
    username:{
        type:"String",
        required:true
    },
    password:{
        type:String,
        required:true
    },
    quizCreated:[]
})
const userModel=mongoose.model("User",userSchema)
// var i=new userModel({
//     name:"kfaedf",
//     username:"jiv@gmail.com",
//     password:"fnjdfjndfej"
    
    
//     })
//     // i.save()
// userModel.insertMany([i],(err)=>{
//     if(err){
//       console.log("errir")
//     }else{
//       console.log("done")
// }})
module.exports={
    quizModel : quizModel,
    userModel:userModel
}

// module.exports=quizNameModel;



