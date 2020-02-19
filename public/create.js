inp=document.getElementById("inp")
qocontainer=document.getElementsByClassName("qocontainer")[0]
quizname=document.getElementById("inpquizname")
create=document.getElementById("create")

const formdata=document.getElementById("formdata");
javascriptObj={
    question:[],
    options:[],
    correctoption:[]

}
optionObj={}

// add=document.getElementById("add")
addoption=document.getElementById("addoption")
option=document.getElementsByClassName("option")[0]
allOption=document.querySelectorAll(".options")
// option.style.display="none"
inp.addEventListener("keypress",(e)=>{
    if(e.key==="Enter" & inp.rows!=5){
     
     inp.rows=parseInt(inp.rows)+1
     console.log(inp.rows)
    }
    

//    add.style.height="4px";
})
// add.addEventListener("click",(e)=>{
//     if(inp.value!=""){
//         paragraph=document.createElement("p")
//         console.log(paragraph)
//         // t=document.createTextNode(inp.value)
//         // paragraph.appendChild(t)
//         paragraph.innerText=(inp.value).replace(/\n/g," ");
//         divcontainer=document.getElementsByClassName("question")[0]
//         console.log(divcontainer)
//         divcontainer.appendChild(paragraph)
//         inp.value=""
//         inp.style.display="none"
//         add.style.display="none"
//         option.style.display="flex"


//     }
// })
addoption.addEventListener("click",()=>{
    if(inp.value!="" && allOption[0].value!="" && allOption[1].value!="" && allOption[2].value!="" && allOption[3].value!="" && allOption[4].value!=""){
        console.log(allOption[2].value)
                // paragraph=document.createElement("p")
                // console.log(paragraph)
                // t=document.createTextNode(inp.value)
                // paragraph.appendChild(t)
                // paragraph.innerText=(inp.value).replace(/\n/g," ");
                // paragraph.classList.add("questionclass")

                // divcontainer=document.getElementsByClassName("question")[0]
                // console.log(divcontainer)
                // inp.value=""
                // divcontainer.appendChild(paragraph)
                // qocontainer.appendChild(paragraph)
            
    // for(i=0;i<5;i++){
    // paragraph=document.createElement("p")
    // paragraph.classList.add("optionclass")
    // paragraph.innerText=(allOption[i].value).replace(/\n/g," ");
    // allOption[i].value=""
    // divcontainer=document.getElementsByClassName("opt")[0]
    // divcontainer.appendChild(paragraph)
    // qocontainer.appendChild(paragraph)}

    
    const formdataObj=new FormData(formdata)
    
  
    for(var [key,value] of formdataObj.entries()){
        switch(key){
            case "question":
                javascriptObj.question.push(value)
                break;
            case "op1":
               optionObj.a=value;
                break;
               
            case "op2":
                optionObj.b=value;
                break;
               
            case "op3":
                optionObj.c=value;
                break;
               
            case "op4":
                optionObj.d=value;
                javascriptObj.options.push(optionObj)

                break;
            case "correctoption":
                javascriptObj.correctoption.push(value);
                break;
               


        }
    }
    
    console.log(javascriptObj)

    allOption[0].value=""
    allOption[1].value=""
    allOption[2].value=""
    allOption[3].value=""
    allOption[4].value=""
    inp.value=""
    // inp.style.display="flex"
    // add.style.display="flex"
    // option.style.display="none"
}else{
    alert("please fill all input field ")
}
 

})
create.addEventListener("click",()=>{
    

       
    // //application/json;charset=UTF-8 or application/json
    // //this is important to mention as type of data sent from client is json either array  or object
  
   if( quizname.value!="" && quizname.value!=null){
    confirms=confirm("Do you want to create quiz ?? ")
    if(confirms){
    const xhr=new XMLHttpRequest();
    xhr.open("POST","/data",true)
    javascriptObj.title=quizname.value
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.send(JSON.stringify(javascriptObj))
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===4 && xhr.status=="200"){
            window.location="/"
     
        }
    }}}else{
        alert("Please dont leave quiz input field empty !!")
    }
})