const mongoose=require("mongoose")
// const url="mongodb+srv://jivanbhai1:Jivan123456@cluster0-lmfsu.mongodb.net/Quizdb"
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
const quizNameSchema=new Schema({
    quizname:{
        type:String,
        required:true
    }
})
const quizSchema=new Schema({
    // quizname:{
    //     type:String,
    //     required:true
    // },
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

const quizNameModel=mongoose.model("Quizname",quizNameSchema)
const quizModel=mongoose.model("Quiz",quizSchema)
q1="what is your name kfmfknnnnnnn nnnnnnnnn nnnnnnnnnnnnnnkfmfknnnnnnn nnnnnnnnn nnnnnnnnnnnnnn kfmfknnnnnnn nnnnnnnnn nnnnnnnnnnnnnn vvvvvvv vvvvvvvvvvvv vvvvvvvvvvvvvvvv vvvvvvv vvvvvvvvvv nnnnnnnnnnnnn nnnnvnjfv?"
q2="fuck your question?"
q3="hey ,father name bata re gandu ?"
d1=new quizNameModel({
  quizname:"Science"  
})
// d1.save()
i1=new quizModel( 
       
       {

        
           question:[q1,q2,q3],
        options:[{
            a:"bhdjfsdn",
            b:"nkfnfkj",
            c:"sdfjndjfnf",
            d:"nfkfjrnk"
        },{
            a:"wklmwekf",
            b:"knwfjenfej",
            c:"fnenkfjkwejn",
            d:"kfnekfweo"
        } ,
        {
            a:"sdkdnckdnc",
            b:"dknjfkjnfwe",
            c:"kjfnkwejnfj",
            d:"kjkjhgsrj"
        } ],
        correctOption: ["nkfnfkj", "kfnekfweo","dknjfkjnfwe"]})

 quizModel.insertMany([i1],(err)=>{
     if(err)
       console.log(err)
    else
      console.log("success hai boss")   
 })              

module.exports=quizModel;
// module.exports=quizNameModel;



