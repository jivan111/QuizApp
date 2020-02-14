const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Quizdb",{useNewUrlParser:true,useUnifiedTopology: true } )
//this is redundant as database is opened as soon as its connected
// mongoose.connection
//  .once("open",()=>{
//      console.log("opened")

//  })
//  .on("error",()=>{
//      console.log("error")
//  })
const Schema = mongoose.Schema;
const quizSchema=new Schema({
    question:{
        type:String,
        required:true
    },
    options:Object,
    correctOption:{
        type:String,
        required:true
    }

})
const quizModel=mongoose.model("Quiz",quizSchema)
q1="what is your name kfmfknnnnnnn nnnnnnnnn nnnnnnnnnnnnnnkfmfknnnnnnn nnnnnnnnn nnnnnnnnnnnnnn kfmfknnnnnnn nnnnnnnnn nnnnnnnnnnnnnn vvvvvvv vvvvvvvvvvvv vvvvvvvvvvvvvvvv vvvvvvv vvvvvvvvvv nnnnnnnnnnnnn nnnnvnjfv?"
q2="fuck your question?"
q3="hey ,father name bata re gandu ?"
i1=new quizModel( 
       {question:q1,
        options:{
            a:"bhdjfsdn",
            b:"nkfnfkj",
            c:"sdfjndjfnf",
            d:"nfkfjrnk"
        } ,
        correctOption: "nkfnfkj" })
i2=new quizModel({
    question:q2,
               options:{
                   a:"wklmwekf",
                   b:"knwfjenfej",
                   c:"fnenkfjkwejn",
                   d:"kfnekfweo"
               } ,
               correctOption:"kfnekfweo"
})
i3=new quizModel({question:q3,
               options:{
                   a:"sdkdnckdnc",
                   b:"dknjfkjnfwe",
                   c:"kjfnkwejnfj",
                   d:"kjkjhgsrj"
               } ,
               correctOption: "dknjfkjnfwe" })
//  quizModel.insertMany([i1,i2,i3],(err)=>{
//      if(err)
//        console.log("err")
//     else
//       console.log("success hai boss")   
//  })              

module.exports=quizModel;


