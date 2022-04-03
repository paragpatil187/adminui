import React, { useState } from 'react'

function Editform() {
    const[name,setName]=useState([])
    const[email,setEmail]=useState("")
    const[role,setRole]=useState("")
  return (
    <div>
    <input type="text"/>
    <input type="text"/>
    <input type="text"/>
    </div>
  )
}

export default Editform