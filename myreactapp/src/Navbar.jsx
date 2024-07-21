import './Navbar.css'
import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Navbar(props){
    const navigate = useNavigate()
    const UserId = props.UserId
    const [data, updateData] = useState(null)
    const [ MenuStatus, MenuUpdate ] = useState(false);
    const clickHandler = (e) => {
        const Menu = document.getElementById("Menu");
        if(MenuStatus) Menu.style.display = "none";
        else Menu.style.display = "flex";
        MenuUpdate(!MenuStatus)
    }
    const navigationHandler = (e) => {
        navigate("../Home",{ state: UserId })
    }
    useEffect(() => {
        axios.get("http://localhost:5000/api/users",{
            params: {
                id: UserId
            }
        }).then((result) => {
            console.log("Data: ")
            console.log(result.data)
            updateData(result.data)
        }).catch(error => console.log(error))
    },[])
    return(
        <div className = 'navbar-container'>
            <div onClick = { navigationHandler } className="web-container">
                <img src="/logo-new.png" alt="Logo" className="logo" />
                <p className = "Name">Visua<span>tics</span></p>
            </div>
            <ul className="options">
                <li className = 'tab'><NavLink to = "/AboutUs" state = { UserId }>About Us</NavLink></li>
                <li className = 'tab'><NavLink to = "/ContactUs" state =  { UserId }>Contact Us</NavLink></li>
                <li className = 'tab'><NavLink to = "/Contribute" state = { UserId }>Contribute</NavLink></li>
                <img onClick = { clickHandler } src = { "http://localhost:5000/WallPapers/" + (data ? data.ProfilePicture : null) } alt = { data ? data.FullName : null} className = "user-profile" />
            </ul>
            <div className="Menu" id = "Menu">
                <img src = { "http://localhost:5000/WallPapers/" + (data ? data.ProfilePicture : null) } alt = { data ? data.FullName : null}  className="profile-image" />
                <p>{ data ? data.User : null }</p>
                <ul>
                    <li><NavLink to = "/Library" state = { UserId } >Library</NavLink></li>
                    <li><NavLink to = "/UpdateProfile" state = { UserId } >Update Profile</NavLink></li>
                    <li><NavLink to = "/LogIn?LogOut=true">Sign Out</NavLink></li>
                </ul>
            </div>
        </div>        
    )
}
export default Navbar

