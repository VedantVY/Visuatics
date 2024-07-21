import './Input.css'
function Input(props){
    const type =  props.type === "textarea" ? <textarea id = { props.name } type = { props.type } value = { props.value } /> : <input id = { props.name } type = { props.type } step = { props.step } value = { props.value }/>
    const style = {
        display: "block"
    }
    return(
        <div className="input-container">
            <label htmlFor = {props.text}> {props.text}</label>
            {
               type
            }
            <i className={ props.favicon }></i>
            <p className = { props.errstat ? "errorActive" : "error" } id = {props.errorID} >{ props.errorText }</p>
        </div>
    )
}
export default Input