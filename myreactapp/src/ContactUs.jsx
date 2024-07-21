import './ContactUs.css'
import Input from './Input'
import { useState, useEffect } from 'react'
import { useLocation,useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from './Navbar'
import Toast from './Toast'
import axios from 'axios'
function ContactUs(){
    const UserId = useLocation().state
    const navigate = useNavigate()
    const [ searchParams, updateSearchParams ] = useSearchParams()
    const [ errorStat , updateErrorStat ] = useState([ false, false, false, false ])
    const validateData = () => {
        const FirstName = document.getElementById("First").value
        const LastName = document.getElementById("Last").value
        const Email = document.getElementById("Email").value
        const Description = document.getElementById("Description").value
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
        if(Description === ''){
            newStat[3] = true
            validation = false;
        }
        else{
            newStat[3] = false
        }
        updateErrorStat(newStat.map((val) => val))
        return(validation) 
    }
    const clickHandler = (e) => {
        e.preventDefault()
        if(!validateData()) return(
            console.log("Err: "+errorStat)
        )
        const FirstName = document.getElementById("First").value
        const LastName = document.getElementById("Last").value
        const FullName = FirstName+" "+LastName
        const Email = document.getElementById("Email").value
        const Description = document.getElementById("Description").value
        axios.post("http://localhost:5000/api/contacts",{ FullName, Email, Description })
        .then((result) => {
            navigate("../ContactUs?Success=true",{ state: UserId })
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return(
        <div className = 'ContactUs'>
            <Navbar UserId = { UserId } />
            <div className="body">
                <div className="contactUs-container">
                    <div className="side-bar">
                        <h2>Having Questions <br />or Suggestions?</h2>
                        <p>Write to us your queries and <br />feedback and we'll try our<br /> best to get back to you!</p>
                    </div>
                    <div className="form-container">
                        <form onSubmit = { clickHandler }>
                            <Input name = "First" text = "Enter your First Name" type = "text" errorID = "FNameErr" errorText = "*The firstname is required!" errstat = { errorStat[0] } />
                            <Input name = "Last" text = "Enter your Last Name" type = "text" errorID = "LNameErr" errorText = "*The lastname is required!" errstat = { errorStat[1] }/>
                            <Input name = "Email" text = "Enter your Email" type = "email" errorID = "EmailErr" errorText = "*The email is required!" errstat = { errorStat[2] }/>
                            <Input name = "Description" text = "Write to Us" type = "textarea" errorID = "DescErr" errorText = "*The description is required!" errstat = { errorStat[3] } />
                            <button type = "submit" className="send">Send</button>
                        </form>
                    </div>
                </div>
            </div>
            { searchParams.get("Success") ? <Toast type = "Success" title = "Success" text = "Your query has been noted! We'll contact you shortly."/> : null }
        </div>
    )
}
export default ContactUs