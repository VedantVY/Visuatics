import './Button.css'
function Button(props){
    return (
        <div className="button-container">
            <button onClick = { props.click } type = { props.type } className = { props.style }>{ props.text }</button>
        </div>
    )
}
export default Button