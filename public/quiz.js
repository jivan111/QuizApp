userResponse=[]
userOption=[]
quizData=JSON.parse(dataFromServer)
console.log(quizData)
var allOption=document.querySelectorAll(".o")


questions=document.getElementById("question")
prev=document.getElementById("prev")
next=document.getElementById("next")
o1=document.getElementById("o1")
o2=document.getElementById("o2")
o3=document.getElementById("o3")
o4=document.getElementById("o4")
questions.innerHTML="Q"+".1) "+quizData[0].question[0]
o1.innerHTML=quizData[0].options[0].a
o2.innerHTML=quizData[0].options[0].b
o3.innerHTML=quizData[0].options[0].c
o4.innerHTML=quizData[0].options[0].d

var i=0;
next.addEventListener("click",(e)=>{
    // if(quizData.length-1!=i){

    //     //  xhr=new XMLHttpRequest();
    //     // xhr.open("GET","/sub",true)
    //     // xhr.send()
    // }
if(i<(quizData[0].question.length-1)){
        e.preventDefault()

        i=i+1;
       
        question_no=i+1;    
        
        questions.innerHTML="Q"+question_no+") "+quizData[0].question[i]
        o1.value=quizData[0].options[i].a
        o2.innerHTML=quizData[0].options[i].b
        o3.innerHTML=quizData[0].options[i].c
        o4.innerHTML=quizData[0].options[i].d
        last_index=userOption.length-1
        val=userOption[last_index]
        
        allOption[val].classList.remove("clickColor")
        

     
    }
})
prev.addEventListener("click",()=>{
    if(i!=0){
       
            i=i-1


    
    question_no=i+1
    questions.innerHTML="Q"+question_no+") "+quizData[i].question
    o1.innerHTML=quizData[0].options[i].a
    o2.innerHTML=quizData[0].options[i].b
    o3.innerHTML=quizData[0].options[i].c
    o4.innerHTML=quizData[0].options[i].d
    last_index=userOption.length-1
    val=userOption[last_index]
    
    allOption[val].classList.remove("clickColor")   

}
})

 for(let j=0;j<4;j++){
    allOption[j].addEventListener("click",()=>{
         changeOptionColour(j)
         userResponse[i]=allOption[j].innerHTML
         userOption[i]=j
         console.log(userResponse,userOption)
        if((allOption[j].innerHTML)===quizData[0].correctOption[i]){
            console.log("correct otion clicked")
           
        }else{
            console.log(i,quizData[0].correctOption)

        }

    })
    }
function changeOptionColour(optionNo){

    
    switch(optionNo){
        case 0:
                allOption[0].classList.add("clickColor")
                allOption[1].classList.remove("clickColor")
                allOption[2].classList.remove("clickColor")
                allOption[3].classList.remove("clickColor")
                break;
        case 1:
                allOption[0].classList.remove("clickColor")
                allOption[1].classList.add("clickColor")
                allOption[2].classList.remove("clickColor")
                allOption[3].classList.remove("clickColor")
                break;
        case 2:
                allOption[0].classList.remove("clickColor")
                allOption[1].classList.remove("clickColor")
                allOption[2].classList.add("clickColor")
                allOption[3].classList.remove("clickColor")
                break;
        case 3:
                allOption[0].classList.remove("clickColor")
                allOption[1].classList.remove("clickColor")
                allOption[2].classList.remove("clickColor")
                allOption[3].classList.add("clickColor")
                break;
                }
}
