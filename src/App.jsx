import{Button,HTMLTable,EditableText,Toaster} from '@blueprintjs/core';

import './App.css'
import { useEffect, useState } from 'react';


const ToasterNotification=Toaster.create({
  position:'bottom-left'
})
function App() {
 const[users,setUsers] = useState([])
const[newName,setNewname]=useState('')
const[newEmail,setNewemail]=useState('')
const[newWebsite,setNewwebsite]=useState('')
  useEffect(()=>{
    const CallBack=async()=>{
      try{
        const response=await fetch('https://jsonplaceholder.typicode.com/users')
        const result= await response.json();
        setUsers(result)
      }
      catch(err){
        console.log(err)
      }
     
    }
    CallBack()
  },[])
 function addUser(){
const name=newName.trim();
const website=newWebsite.trim()
const email=newEmail.trim();
if(name && website && email){
  
    const Vanakam=async()=>{
      try{
        const response=await fetch('https://jsonplaceholder.typicode.com/users',{
          method:"POST",
          body:JSON.stringify({
            name:name,
            website:website,
            email:email
          }),
          headers:
            { "Content-Type": "application/json; charset=UTF-8 "}
          
       
        })
        const result= await response.json();
        console.log(result)
        ToasterNotification.show({
          message:"User Added Successfully",
          intent:'success',
          timeout:3000
        })
        setUsers([...users,result]);

        setNewname('');
        setNewemail('');
        setNewwebsite('')
      }
      catch(err){
        console.log(err)
      }
     
    }
    Vanakam()

} else{
  alert('plase enter valid inputs')
}
 }
 function handleChange(id,key,e){
 
 setUsers((users)=>(users.map(
    user=>user.id==id?{...user,[key]:e}:user
 )))
 }
 function handleUpdate(id){
 const update=users.find(user=>user.id==id);

  const Vanakam=async()=>{
    try{
      const response=await fetch('https://jsonplaceholder.typicode.com/users/10',{
        method:"PUT",
        body:JSON.stringify({
        update
        }),
        headers:
          { "Content-Type": "application/json; charset=UTF-8 "}
        
     
      })
      const result= await response.json();
      console.log(result)
      ToasterNotification.show({
        message:"User Updated Successfully",
        intent:'success',
        timeout:3000
      })
      

      setNewname('');
      setNewemail('');
      setNewwebsite('')
    }
    catch(err){
      console.log(err)
    }
   
  }
  Vanakam()
   
 }
 function handleDelete(id){
 
  const Vanakam=async()=>{
    try{
      const response=await fetch('https://jsonplaceholder.typicode.com/users',{
        method:"DELETE",
        body:JSON.stringify({
          id
        }),
        headers:
          { "Content-Type": "application/json; charset=UTF-8 "}
        
     
      })
      const result= await response.json();
      console.log(result)
      ToasterNotification.show({
        message:"User Deleted Successfully",
        intent:'success',
        timeout:3000
      })
      

      setNewname('');
      setNewemail('');
      setNewwebsite('')
    }
    catch(err){
      console.log(err)
    }
   
  }
  setUsers(users=>(users.filter(user=>(user.id!=id))))
  Vanakam()


 }
  return (
    <>
    <HTMLTable className='bp3-html-table' >
    <thead>
      <th>id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Website</th>
      <th>Some</th>
    </thead>
    <tbody>
    {users.map(data=>(
      <tr key={data.id}>
      <td>{data.id}</td>
      <td><EditableText value={data.name}/></td>
      <td><EditableText value={data.email} onChange={(e)=>handleChange(data.id,'email',e)}  /></td>
      <td><EditableText value={data.website} onChange={(e)=>handleChange(data.id,'website',e)} /></td>
      <td><Button intent='primary' onClick={()=>handleUpdate(data.id)}>update</Button>
      <Button intent='danger' onClick={()=>handleDelete(data.id)}>Delete</Button></td>
    </tr>
    ))}
    </tbody>
    <tfoot>
 <tr>
  <td></td>
 <td><input type="text" placeholder='Enter Your Name' value={newName} onChange={(e)=>setNewname(e.target.value)}/></td>
 <td><input type="text" placeholder='Enter Your Email'  value={newEmail} onChange={(e)=>setNewemail(e.target.value)}  /></td>
 <td><input type="text" placeholder='Enter Your Website' value={newWebsite} onChange={(e)=>setNewwebsite(e.target.value)}/></td>
 <td><Button intent='success' onClick={addUser}>Add User</Button></td>
 </tr>
    </tfoot>

    </HTMLTable>
  
    </>
  )
}

export default App
