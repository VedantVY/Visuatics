import Input from './Input'
import Button from './Button'
import './Register.css'
import axios from 'axios'
import { useState } from 'react'
import FormData from 'form-data'
import { useNavigate } from 'react-router-dom'  
import Toast from './Toast' 
import { NavLink } from 'react-router-dom'
function Register(){
    const [ sub , updateSub ] = useState(false)
    const navigate = useNavigate()
    const [ errorStat , updateErrorStat ] = useState([ false, false, false, false, false, false, false])
    const validateData = () => {
        const FirstName = document.getElementById("First").value
        const LastName = document.getElementById("Last").value
        const FullName = FirstName+" "+LastName
        const Email = document.getElementById("Email").value
        const User = document.getElementById("Username").value
        const Password = document.getElementById("Password").value
        const CPassword = document.getElementById("Confirm Password").value
        const ProfilePicture = document.getElementById("ProfilePicture").value
        let validation = true;
        let newStat = errorStat
        if(FirstName === ''){
            newStat[0] = true
            validation = false;
        }
        else{
            newStat[0] = false
        }
        if(LastName === ''){
            newStat[1] = true
            validation = false;
        }
        else{
            newStat[1] = false
        }
        if(Email === ''){
            newStat[2] = true
            validation = false;
        }
        else{
            newStat[2] = false
        }
        if(User === ''){
            document.getElementById("UsernameErr").innerText = "*The username is required!"
            newStat[3] = true
            validation = false;
        }
        else{
            newStat[3] = false
        }
        if(Password === ''){
            document.getElementById("PasswordErr").innerText = "*The password is required!"
            newStat[4] = true
            validation = false;
        }
        else if(Password.length < 8){
            document.getElementById("PasswordErr").innerText = "*The length is less than 8!"
            newStat[4] = true
            validation = false;
        }
        else{
            newStat[4] = false
        }
        if(ProfilePicture === ''){
            newStat[6] = true
            validation = false;
        }
        else{
            newStat[6] = false
        }
        if(CPassword === ''){
            document.getElementById("CPasswordErr").innerText = "*The password is required!"
            newStat[5] = true
            validation = false;
        }
        else if(CPassword.localeCompare(Password) !== 0){
            document.getElementById("CPasswordErr").innerText = "*The password(s) do not match with each other!"
            newStat[5] = true
            validation = false;
        }
        else{
            newStat[5] = false
        }
        updateErrorStat(newStat.map((val) => val))
        return(validation) 
    }
    function clickHandler(e){
        e.preventDefault()
        if(!validateData()) return(
            console.log("Err: "+errorStat)
        )
        const formData = new FormData()
        const FirstName = document.getElementById("First").value
        const LastName = document.getElementById("Last").value
        const FullName = FirstName+" "+LastName
        const Email = document.getElementById("Email").value
        const User = document.getElementById("Username").value
        const Password = document.getElementById("Password").value
        const ProfilePicture = document.getElementById("ProfilePicture").files[0]
        formData.append("FullName",FullName)
        formData.append("User",User)
        formData.append("Email",Email)
        formData.append("Password",Password)
        formData.append("ProfilePicture",ProfilePicture)
        axios.post("http://localhost:5000/api/users",formData,{
            header: {
                'accept': 'application/json',
                'Accept-Language': "en-US,en;q=0.8",
                'Content-Type': "multipart/form-data" 
            }
        })
        .then((result) => {
            setTimeout(() => navigate("Home", {
                state: result.data._doc._id
            }),7000)
            updateSub(true)
        })
        .catch((error) => {
            if(error.response.status === 400){
                document.getElementById("UsernameErr").innerText = "*"+error.response.data.error
                updateErrorStat(errorStat.map((value,index)=>{ if(index === 3) return(true)
                    return(false)
                }))
            }
            else console.log(error)
        })
    }
    return (
    <div className = 'Register'>
    <div className = 'form-container'>
        <div className = "heading">
            <h2>Welcome!</h2>
            <p>Sign up to get started.</p>
        </div>
        <form onSubmit = { clickHandler } encType = "multipart/form-data">
            <Input name = "First" text = "Enter your First Name" type = "text" errorID = "FNameErr" errorText = "*The firstname is required!" errstat = { errorStat[0] } />
            <Input name = "Last" text = "Enter your Last Name" type = "text" errorID = "LNameErr" errorText = "The lastname is required!" errstat = { errorStat[1] }/>
            <Input name = "Email" text = "Enter your E-mail" type = "text" errorID = "EmailErr" errorText = "*The email is required" favicon = "fa fa-envelope icon" errstat = { errorStat[2] }/>
            <Input name = "Username" text = "Enter your UserName" type = "text" errorID = "UsernameErr" errorText = "*The username is required!" favicon = "fa fa-user icon" errstat = { errorStat[3] }/>
            <Input name = "Password" text = "Enter your Password" type = "password" errorID = "PasswordErr" errorText = "The password is required!" favicon = "fa fa-key icon" errstat = { errorStat[4] }/>
            <Input name = "Confirm Password" text = "Confirm your Password" type = "password" errorID = "CPasswordErr" errorText = "*The password is required to be confirmed!" favicon = "fa fa-key icon" errstat = { errorStat[5] }/>
            <Input name = "ProfilePicture" text = "Choose your Profile Picture" type = "file" errorID = "ProfilePictureErr" errorText = "*The profile picture is required!" favicon = "fa fa-picture-o icon" errstat = { errorStat[6] }/>
            <Button text = "Register" type = "submit" style = "Success"/>
        </form>
        <div className="SignIn">
                <p className = "link">Already have an account?</p>
                <NavLink to = "/LogIn">Sign In</NavLink>
        </div>
    </div>
    { sub ? <Toast type = "Success" title = "Success" text = "New account has been created!"/> : null }
    </div>
    )
}
export default Register