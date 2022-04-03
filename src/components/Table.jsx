import "../components/Table.css"
import React, { useState,useEffect } from 'react'
import axios from "axios"
import ReactPaginate from "react-paginate"
const User = () => {
const [user,setUser]=useState([]);
//pagination ref internet
const [page,setPage]=useState(0);
const [form,setForm]=useState("");
const[name,setName]=useState([])
const[email,setEmail]=useState("")
const[role,setRole]=useState("")
const [userId,setUserId]=useState(null);
const[isEditing,setUpdateEditing]=useState(false)
const userLimit=10;
const pagesVisited=page*userLimit;
const pageTotal=Math.ceil(user.length/userLimit);
const changePage=({selected})=>{
    setPage(selected);
};


//simple useefect hook to get data we do not have pagination from backend so first set all data 
useEffect(() => {
    
    getData();
  }, []);
  const getData=async () =>{
    let data=await axios("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
    setUser(data.data)
    setName(data.data[0].name)
    setEmail(data.data[0].email)
    setRole(data.data[0].role)
    setUserId(data.data[0].id)
}
function selectUser(id){
  setUpdateEditing(true)
  setName(user[id-1].name)
    setEmail(user[id-1].email)
    setRole(user[id-1].role)
    setUserId(user[id-1].id)

}
  //delete particular item use filter we have id in api
  const handleDelete = (value) => {
    setUser(
      user.filter((e) => {
        if (e.id !== value) return e;
      })
    );
  };
  
  const updateUser= ()=>{
    // console.log(name,email,role,userId)
    // let item={name,email,role,userId}
    user.find((e)=>{

      if(e.id==userId){
        //console.log(userId)
        //console.log("go it",user)
        e.name=name;
        e.email=email;
        e.role=role
      }
    })
    setUser(user.filter((e)=>{
      return e
    })
    )
    setUpdateEditing(false)
    //console.log(user)
    

  }
  
  //for search operation
  const handleInput = (e) => {
    setForm(e.target.value);
  };
  //console.log(table);

  return (
    <div id="container">
    
    <div id="search">
      <input
        placeholder="search by name,id or email"
        onChange={handleInput}
      />
    </div>
    <div className="userList">
      <table style={{ width: "1000px", textAlign: "left" }}>
        <tr>
          <td style={{width:"10px"}}> 
          <input  type="checkbox"/>
          </td>
          <th className="name">Name</th>
          <th className="email">Email</th>
          <th className="role">Role</th>
          <th>Action</th>
        </tr>
      </table>
    </div>

    {user
      .filter((e) => {
        if (form == "") return e;
        else if (
          e.name.toLowerCase().includes(form.toLowerCase()) ||
          e.id.includes(form)||
          e.email.toLowerCase().includes(form.toLowerCase())
        ) {
          return e;
        }
      })
      .slice(pagesVisited, pagesVisited + userLimit)
      .map((e) => (
        <div className="userList">
          <table style={{ width: "1000px", textAlign: "left" }}>
            <tr>
              <td style={{width:"5px"}}>
                <input  type="checkbox" />
              </td>
              <td className="name" >{e.name}</td>
              <td className="email">{e.email}</td>
              <td className="role">{e.role}</td>
              <td>
                <button onClick={() => handleDelete(e.id)}>Delete</button>
                <button onClick={() => selectUser(e.id)}>Edit</button>
              </td>
              
              

              

            </tr>
          </table>
        </div>
      ))}

    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      pageCount={pageTotal}
      onPageChange={changePage}
      containerClassName={"paginationBttns"}
    />
    {isEditing?
    <div>
    <h1>edit box</h1>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/><br/><br/>
    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
    <input type="text" value={role} onChange={(e)=>setRole(e.target.value)}/><br/><br/>
    <button onClick={updateUser}>edit user</button>
    </div>
    :null}
  </div>
);
    
  
}

export default User