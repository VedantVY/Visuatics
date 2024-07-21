import './Toast.css'
import { useState } from 'react'
function Toast(props){
    const [ state , updateState ] = useState(1);
    const clickHandler = (e) =>{
        document.getElementsByClassName("toast-container")[0].style.display = "none";
        updateState(0);
    }
    return (
    <div className = "toast-container">
        <div className = { "header " + props.type }>
            <div className="left-header">
                <img src = { props.type === "Success" ? "/check-circle-green-256.png" : "/caution.png" } alt = "green tick" className = "icon"/>
                <p className="title"><strong>{ props.title }</strong></p>
            </div>
            <div className="right-header">
                <p className="time"><small>Just now</small></p>
                <p className = "exit-icon" onClick = { clickHandler }> &times; </p>
            </div>
        </div>
        <div className = { "Body " + props.type }>
            <p className="text">
            { props.text }
            </p>
        </div>
    </div>
    )
}
export default Toast