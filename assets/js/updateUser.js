
alert("jai")
const submit=document.getElementById("submit")
const email=document.getElementById("email")
const id = document.getElementById("id")
const userName=document.getElementById("name")

submit.addEventListener('click',async(e)=>{
   e.preventDefault()
   const updateData={
    name:userName.value,
    email:email.value
   }
   const userId=id.value

   const url="/adminEditUser/"+userId
   try{
    const response=await fetch(url,{
        method:'put',
        headers:{
            "Accept":"application/json", 
            "Content-type":"application/json" 
        },
        body:JSON.stringify(updateData)
    })
    const result=await response.json()
    window.location=result.url

   }catch(error){
console.log(error);
   }
})