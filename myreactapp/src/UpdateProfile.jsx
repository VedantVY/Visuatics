import Input from './Input'
import './UpdateProfile.css'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Button from './Button'
import FormData from 'form-data'
function UpdateProfile(){
    const UserId = useLocation().state
    const [ orders, updateOrder] = useState(null)
    const [ likes, updateLike] = useState(0)
    const [ sub , updateSub ] = useState(false)
    const [ data , updateData ] = useState(false)
    useEffect(() => {
        axios.post("http://localhost:5000/api/orders/user",{ UserId: UserId }).then((result) => {
            updateOrder(result.data)
        }).catch(error => console.log("Err: "+error))
        axios.get("http://localhost:5000/api/products/Likes",{
            params: {
                UserId: UserId
            }
        }).then((result) => {
            updateLike(result.data.length)
        }).catch((error) => console.log(error))
    },[])
    useEffect(() => {
        axios.get("http://localhost:5000/api/users",{
            params: {
                id: UserId
            }
        }).then((result) => {
            updateData(result.data)
            document.getElementById("First").value = result.data.FullName.split(" ")[0]
            document.getElementById("Last").value = result.data.FullName.split(" ")[1]
            document.getElementById("fname").value = result.data.FullName
            document.getElementById("Email").value = result.data.Email
            document.getElementById("email").value = result.data.Email
            document.getElementById("Username").value = result.data.User
            document.getElementById("uname").value = result.data.User
        }).catch(error => console.log(error))
    },[])
    const [ errorStat , updateErrorStat ] = useState([ false, false, false, false, false, false, false])
    const validateData = () => {
        const FirstName = document.getElementById("First").value
        const LastName = document.getElementById("Last").value

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
        formData.append("FullName",document.getElementById("First").value+" "+document.getElementById("Last").value)
        formData.append("User",document.getElementById("Username").value)
        formData.append("Email",document.getElementById("Email").value)
        formData.append("Password",document.getElementById("Password").value)
        formData.append("ProfilePicture",document.getElementById("ProfilePicture").files[0])
        axios.put("http://localhost:5000/api/users/"+UserId,formData,{
            headers: {
                'accept': 'application/json',
                'Accept-Language': "en-US,en;q=0.8",
                'Content-Type': "multipart/form-data" 
            }
        })
        .then((result) => {
            console.log(result)
            updateSub(true)
        })
        .catch((error) => {
            if(error.response.status === 400){
                document.getElementById("UsernameErr").innerText = "*"+error.response.data.error
                updateErrorStat(errorStat.map((value,index)=>{ if(index === 3) return(true)
                    return(false)
                }))
            }
        })
    }



    return(
        <div className = 'UpdateProfile'>
            <Navbar UserId = { UserId } />
                <div className="container">
                    <div className="profile-info">
                        <div className="image">
                            <img src = {data ? "http://localhost:5000/ProfilePictures/"+data.ProfilePicture : null } id = "profile-picture" alt="profile-picture" className="profile-picture" />
                        </div>
                        <h2 className = "name" id = "fname">{ data ? data.FullName : null }</h2>
                        <p className="username" id = "uname">{ data ? data.User : null }</p>
                        <div className="add-on">
                            <p className="item" id = "email"><strong>Email: </strong> { data ? data.Email : null}</p>
                            <p className="item"><strong>Past Orders: </strong>{ orders ? orders.length : null }</p>
                            <p className="item"><strong>Liked Products: </strong> { likes }</p>
                        </div>
                    </div>
                    <div className="main-container">
                        <form onSubmit = { clickHandler } className="update-profile">
                            <Input name = "First" text = "Update your First Name" type = "text" errorID = "FNameErr" errorText = "*The firstname is required!" errstat = { errorStat[0] } />
                            <Input name = "Last" text = "Update your Last Name" type = "text" errorID = "LNameErr" errorText = "The lastname is required!" errstat = { errorStat[1] }/>
                            <Input name = "Email" text = "Update your E-mail" type = "text" errorID = "EmailErr" errorText = "*The email is required" favicon = "fa fa-envelope icon" errstat = { errorStat[2] }/>
                            <Input name = "Username" text = "Update your UserName" type = "text" errorID = "UsernameErr" errorText = "*The username is required!" favicon = "fa fa-user icon" errstat = { errorStat[3] }/>
                            <Input name = "Password" text = "Update your Password" type = "password" errorID = "PasswordErr" errorText = "The password is required!" favicon = "fa fa-key icon" errstat = { errorStat[4] }/>
                            <Input name = "Confirm Password" text = "Confirm your Password" type = "password" errorID = "CPasswordErr" errorText = "*The password is required to be confirmed!" favicon = "fa fa-key icon" errstat = { errorStat[5] }/>
                            <Input name = "ProfilePicture" text = "Update your Profile Picture" type = "file" errorID = "ProfilePictureErr" errorText = "*The profile picture is required!" favicon = "fa fa-picture-o icon" errstat = { errorStat[6] }/>
                            <Button text = "Update Profile" type = "submit" style = "Danger"/>
                        </form>
                    </div>
                </div>
        </div>
    )
}
export default UpdateProfile