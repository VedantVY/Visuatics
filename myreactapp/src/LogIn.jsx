import './LogIn.css'
import Button from './Button'
import Input from './Input'
import { useState } from 'react'
import axios from 'axios'
import Toast from './Toast'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
function LogIn(){
    const navigate = useNavigate()
    const [ searchParams , updateSearchParams ] = useSearchParams()
    const [ errorStat , updateErrorStat ] = useState([ false, false])
    const validateData = () => {
        const User = document.getElementById("Username").value
        const Password = document.getElementById("Password").value
        let validation = true;
        let newStat = errorStat
        if(User === ''){
            document.getElementById("UsernameErr").innerText = "*The username is required!"
            newStat[0] = true
            validation = false;
        }
        else{
            newStat[0] = false
        }
        if(Password === ''){
            document.getElementById("PasswordErr").innerText = "*The password is required!"
            newStat[1] = true
            validation = false;
        }
        else{
            newStat[1] = false
        }
        updateErrorStat(newStat.map((val) => val))
        return(validation) 
    }
    const clickHandler = (e) => {
        e.preventDefault()
        if(!validateData()) return(
            console.log("Err: "+errorStat)
        )
        const formData = new FormData()
        const User = document.getElementById("Username").value
        const Password = document.getElementById("Password").value
        axios.get("http://localhost:5000/api/users/Login",{
            params: {
                User: User,
                Password: Password
            }
        }).then((result) => {
            console.log(result.data)
            navigate("../Home?LogIn=true",{
                state: result.data._id
            })
        }).catch((error) => {
            if(error.response.status === 404){
                document.getElementById("UsernameErr").innerText = "*"+error.response.data.error
                updateErrorStat(errorStat.map((value,index)=>{ if(index === 0) return(true)
                    return(false)
                }))
            }
            else if(error.response.status === 403){
                document.getElementById("PasswordErr").innerText = "*"+error.response.data.error
                updateErrorStat(errorStat.map((value,index)=>{ if(index === 1) return(true)
                    return(false)
                }))
            }
            else console.log(error)
        })
    }
    return (
    <div className = 'LogIn'>
    <div className="decor-section">
    </div>
    <div className = 'form-container'>
        <div className = "heading">
            <h2>Welcome Back!</h2>
            <p>Log In to continue.</p>
        </div>
        <form onSubmit = { clickHandler } encType = "multipart/form-data">
            <Input name = "Username" text = "Enter your UserName" type = "text" errorID = "UsernameErr" errorText = "*The username is required!" favicon = "fa fa-user icon" errstat = { errorStat[0] }/>
            <Input name = "Password" text = "Enter your Password" type = "password" errorID = "PasswordErr" errorText = "The password is required!" favicon = "fa fa-key icon" errstat = { errorStat[1] }/>
            <Button text = "Log In" type = "submit" style = "Success"/>
            <div className="SignUp">
                <p className = "link">Don't have an account?</p>
                <NavLink to = "/">Join Us</NavLink>
            </div>
        </form>
    </div>
    { searchParams.get("LogOut") ? <Toast type = "Success" title = "Success" text = "You have logged-out successfully!"/> : null }
    </div>
    )
}
export default LogIn