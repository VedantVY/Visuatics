import './Contribute.css'
import Input from './Input'
import Button from './Button'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'
import Toast from './Toast'
import FormData from 'form-data'
function Contribute(){
    const navigate = useNavigate()
    const [ searchParams, updateSearchParams ] = useSearchParams()
    const UserId = useLocation().state
    const [ data , updateData ] = useState(null)
    const [ sub , updateSub ] = useState([false,false])
    const [ errorStat , updateErrorStat ] = useState([ false, false, false, false, false])
    const changeHandler = (e) => {
        if(e.target.value !== '') updateSub([sub[0],true])
        else updateSub([sub[0],false])
    }
    useEffect(() => {
        axios.get("http://localhost:5000/api/users",{
            params: {
                id: UserId
            }
        }).then((result) => {
            updateData(result.data)
        }).catch(error => console.log(error))
    },[])
    useEffect(() => {
        if(searchParams.get("Success")) updateSub([true,sub[1]])
    })
    const ValidateData = () => {
        const Title = document.getElementById("Title").value
        const Price = document.getElementById("Price").value
        const Genre = document.getElementById("Genre").value
        const Description = document.getElementById("Description").value
        const Image = document.getElementById("Image").value
        let validation = true;
        let newStat = errorStat
        if(Title === ''){
            newStat[0] = true
            validation = false;
        }
        else{
            newStat[0] = false
        }
        if(Price === ''){
            newStat[1] = true
            validation = false;
        }
        else{
            newStat[1] = false
        }
        if(Genre === ''){
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
        if(Image === ''){
            newStat[4] = true
            validation = false;
        }
        else{
            newStat[4] = false
        }
        updateErrorStat(newStat.map((val) => val))
        return(validation) 
    }
    const clickHandler = (e) => {
        e.preventDefault()
        if(!ValidateData()){
            return(console.log("Error!"))
        }
        const Title = document.getElementById("Title").value
        const Price = document.getElementById("Price").value
        const Genre = document.getElementById("Genre").value
        const Description = document.getElementById("Description").value
        const Image = document.getElementById("Image").files[0]
        const formData = new FormData()
        formData.append("Name",Title)
        formData.append("Price",Price)
        formData.append("Genre",Genre)
        formData.append("Description",Description)
        formData.append("Image",Image)
        formData.append("Author",data.User)
        axios.post("http://localhost:5000/api/products",formData,{
            header: {
                'accept': 'application/json',
                'Accept-Language': "en-US,en;q=0.8",
                'Content-Type': "multipart/form-data" 
            }
        })
        .then((result) => {
            console.log(result)
            navigate("./?Success=true",{ state: UserId })
        }).catch((error) => {
            console.log(error)
        })
    }
    return(
        <div className = 'Contribute'>
            <Navbar UserId = { UserId } />
            <div className="body">
                <div className="form-container">
                    <form onSubmit = { clickHandler } className="contribute" encType = "multipart/form-data">
                        <div style = { sub[1] ? {
                backgroundImage: "url("+URL.createObjectURL(document.getElementById("Image").files[0])+")"
            } : null} className="upload-image">
                            <input id = "Image" type ="file" hidden onChange = { changeHandler }/>
                            <label id = "label" htmlFor = "Image">{ sub[1] ? document.getElementById("Image").value : "Upload a WallPaper"}</label>
                            <p className = { errorStat[4] ? "errorActive" : "error" } id = "ImageErr" >*The wallpaper is required!</p>
                        </div>
                        <div className="rest-info">
                            <Input name = "Title" text = "Enter the Title of the Wallpaper" type = "text" errorID = "TitleErr" errorText = "*The title is required!" errstat = { errorStat[0] } />
                            <Input name = "Price" text = "Enter the Price" type = "number" errorID = "PriceErr" step = "0.01" errorText = "*The price is required!" errstat = { errorStat[1] } />
                            <Input name = "Genre" text = "Enter the Genre" type = "text" errorID = "GenreErr" errorText = "*The genre is required!" errstat = { errorStat[2] } />
                            <Input name = "Description" text = "Give a Description" type = "textarea" errorID = "DescErr" errorText = "*The description is required!" errstat = { errorStat[3] } />
                            <Button text = "Contribute" type = "submit" style = "Success"/>
                        </div>
                    </form>
                </div>
                { sub[0] ? <Toast type = "Success" title = "Success" text = "New Wallpaper has been added!"/> : null }
            </div>
        </div>
    )
}
export default Contribute