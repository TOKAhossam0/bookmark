var siteNameInput = document.getElementById("bookmarkName");
var siteURLInput = document.getElementById("bookmarkURL");
var dataWrapper = document.getElementById("tbody");

var submitBtn=document.getElementById("submitBtn")
var allBookMarks=[];

if(localStorage.allBookMarks !=null){
  allBookMarks=JSON.parse(localStorage.allBookMarks);
  displayData(allBookMarks)
}

function addBookMark(){
if (validateUrl()== true && siteNameInput.value !="") {
  console.log("addBookMark")
  var newBookMarks ={
    siteName:siteNameInput.value,
    siteUrl:siteURLInput.value
  
  }
  allBookMarks.push(newBookMarks);
  localStorage.setItem('allBookMarks',JSON.stringify(allBookMarks))
  console.log(allBookMarks)
  displayData(allBookMarks)
  clearInputs()
  
}else{
  Swal.fire({
    icon: "error",
    title: "invalid data",
    text: `${siteNameInput.value == "" ?"please enter your name":""}${validateUrl()== true? "":"please enter valid url "}`,
    footer: '<a href="#">Why do I have this issue?</a>'
  });
}
  

}
function displayData(arr){
  var cartoona="";
  for(var i = 0; i < arr.length; i++){
    cartoona+=`
    <tr>
                <td>${i+1}</td>
                <td>${arr[i].siteName}</td>              
                <td><a class="btn btn-primary" href="${arr[i].siteUrl}">visit</a></td>
                <td><button class="btn btn-success"onclick="preUpdate(${i})">update</button></td>
                <td><button class="btn btn-danger"onclick="deleteBookMark(${i})">delete</button></td>
                </tr>
            `; 
  }
  dataWrapper.innerHTML=cartoona
}

function preUpdate(index){
  siteNameInput.value = allBookMarks[index].siteName;
  siteURLInput.value = allBookMarks[index].siteUrl
}

function deleteBookMark(index){
 allBookMarks.splice(index,1)
displayData (allBookMarks)

}
function clearInputs (){
  siteNameInput.value=''
  siteURLInput.value=''
}

function validateUrl(){
  var pattern= /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
 console.log( pattern.test(siteURLInput.value));
 return pattern.test(siteURLInput.value);
}