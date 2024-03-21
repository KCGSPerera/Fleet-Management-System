import React, {useEffect, useState} from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login(){

  const history = useNavigate();

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  async function submit(e) {
    e.preventDefault();

    try{
      await axios.post("http://localhost:3000/", {
        email,
        password,
      })
        .then(res => {
          if(res.data == "exist"){
              history("/home",{state : {id : email}})
          }
          else if(res.data == "notexist"){
           alert("User have not in sign up")
        }
        })
        /* .catch(e => {
          alert("wrong details")
          console.log(e);
        })*/

    }/* catch{
      console.log(e);
    } */

    catch (error) {
      console.error("Error:", error);
      alert("Wrong details");
  }
}

  return (
    <div className="login">
      <h1>login</h1>

<form action="POST">

  <input type="email" 
    onChange={(e) => {setEmail(e.target. value) }} placeholder="Email" name="" id="" />
   <input type="password" 
    onChange={(e) => {setPassword(e.target. value) }} placeholder="Password" name="" id="" />

    <input type = "submit" onClick={submit}/>

</form>

 <br/>
<p>OR</p>
<br/>

<Link to="/logout"> Log Out</Link> 

    </div>
  );
};

export default Login
