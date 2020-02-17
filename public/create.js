inp=document.getElementById("inp")
qocontainer=document.getElementsByClassName("qocontainer")[0]
const formdata=document.getElementById("formdata");

// add=document.getElementById("add")
addoption=document.getElementById("addoption")
option=document.getElementsByClassName("option")[0]
allOption=document.querySelectorAll(".options")
// option.style.display="none"
inp.addEventListener("keypress",(e)=>{
    if(e.key==="Enter" & inp.rows!=5){
     
     inp.rows=parseInt(inp.rows)+1
    //  row.toString()
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
    if(inp.value!="" ){
                paragraph=document.createElement("p")
                console.log(paragraph)
                // t=document.createTextNode(inp.value)
                // paragraph.appendChild(t)
                paragraph.innerText=(inp.value).replace(/\n/g," ");
                paragraph.classList.add("questionclass")

                // divcontainer=document.getElementsByClassName("question")[0]
                // console.log(divcontainer)
                // inp.value=""
                // divcontainer.appendChild(paragraph)
                qocontainer.appendChild(paragraph)
            
    for(i=0;i<5;i++){
    paragraph=document.createElement("p")
    paragraph.classList.add("optionclass")
    paragraph.innerText=(allOption[i].value).replace(/\n/g," ");
    // allOption[i].value=""
    // divcontainer=document.getElementsByClassName("opt")[0]
    // divcontainer.appendChild(paragraph)
    qocontainer.appendChild(paragraph)

    }
    const formdataObj=new FormData(formdata)
    // console.log(formdataObj.entries().next().value)
    // entries is an iterator of array and gives key value pair;

    javascriptObj={}
    for(var [key,value] of formdataObj.entries()){
       javascriptObj[key]=value
    }

    const xhr=new XMLHttpRequest()
    xhr.open("POST","/data",true)
    xhr.setRequestHeader("Content-Type","application/json")
    //application/json;charset=UTF-8 or application/json
    //this is important to mention as type of data sent from client is json either array  or object


    xhr.send(JSON.stringify(javascriptObj))
   
    xhr.onprogress=()=>{
        console.log("progressing...")
    }

    // inp.value=""
    // inp.style.display="flex"
    // add.style.display="flex"
    // option.style.display="none"
}

})