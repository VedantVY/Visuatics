import './ToDoList.css'
import { useState } from 'react'
function ToDoList(){
    const [ ToDos, updateToDo ] = useState([])
    const deleter = (e) =>{
        updateToDo([])
    }
    const changeHandler = (e) => {
        updateToDo(ToDos)
    }
    const clickHandler = (ind) => {
        console.log(ToDos)
        const newToDos = ToDos.filter((value,index) => {
            return(index !== ind)
        })
        console.log("New:"+newToDos)
        updateToDo(newToDos)
    }
    const add = (e) =>{
        console.log("Old: "+ToDos)
        const newToDos = ToDos
        const task = document.getElementById("Add").value
        document.getElementById("Add").value = ''
        if(task !== ''){
            newToDos.push(task)
        }
        console.log("New: "+newToDos)
        updateToDo([...newToDos])
    }
    return(
        <div className="container">
            <h1 className="name">ToDo App</h1>
            <div className="newToDo">
                <input type="text" id = "Add" placeholder = 'Add your new todo'/>
                <button onClick = { add } className="plus">+</button>
            </div>
            <div className="rest-input">
                {
                    ToDos.map((value,index) =>{
                        return(<div  key =  { index } className="portfolio">
                            <input type ="text" value = { (index+1)+". "+value } onChange = {() => { changeHandler }}/>
                            <button onClick = { () => { clickHandler(index)} } className="delete"><i className = "fa fa-trash" aria-hidden="true"></i></button>
                        </div>)
                    })
                }
            </div>
            <div className="status">
                <h2 className="pending-tasks"><small>You have { ToDos.length } pending tasks</small></h2>
                <button className="clear" onClick = { deleter }>Clear All</button>
            </div>
        </div>
    )
}
export default ToDoList