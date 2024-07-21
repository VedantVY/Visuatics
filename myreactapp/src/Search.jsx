import './Search.css'
import Button from './Button'
import axios from 'axios'
import Card from './Card'
import Toast from './Toast'
import { useState, useEffect } from 'react'
function Search(props){
    const UserId = props.UserId
    const global_count = props.count
    const updateCount = props.update
    const [ def, updateDefault ] = useState(null)
    const [ string, updateString ] = useState(null)
    const [ sub, updateSub ] = useState(null)
    const [ item, updateItem ] = useState(null)
    const [ products, updateProduct ] = useState([])
    const toast = <Toast type = "Danger" title = "Failed" text = "No search results found!"/>
    const changeHandler = (e) => {
        axios.get("http://localhost:5000/api/products/Search",{
            params: {
                String: document.getElementById("search").value
            }
        }).then((result) => {
            updateString(result.data)
        }).catch((error) => console.log(error))
    }
    const checkCount = (e) => {
        let newCount = global_count
        if(global_count < def.length) newCount = newCount + 3
        if(newCount > def.length) newCount = def.length
        updateCount(newCount)
    }
    const selectItem = (index,type) => {
        if(type === "Products") document.getElementById("search").value = string.Products[index].Name
        else document.getElementById("search").value = string.Genres[index].Name
        updateString(null)
    }
    const clickHandler = (e) => {
        updateProduct([])
        axios.get("http://localhost:5000/api/products/SearchProduct",{
            params: {
                String: document.getElementById("search").value
            }
        }).then((result) => {
            updateProduct([...result.data])
            if(result.data.length == 0) updateSub(<Toast type = "Danger" title = "Failed" text = "No search results found!"/>)
            else updateSub(null)
        }).catch((error) => console.log(error))
    }
    useEffect(() => {
        let temp = []
        if(string) temp = temp.concat(string.Products.map( (val,index) => {
            return(<p key = { "Products "+index } onClick = { () => selectItem(index,"Products") } className = 'item'>{ val.Name }</p>)
        }))
        if(string) temp = temp.concat(string.Genres.map((val,index) => {
            return(<p key = { "Genres "+index } onClick = { () => selectItem(index,"Genres") } className = 'item'>{ val.Name }</p>)
        }))
        updateItem([...temp])
    },[string])
    useEffect(() => {
        axios.get("http://localhost:5000/api/products/SearchAllProduct")
        .then((result) => {
            console.log("Products")
            console.log(result.data)
            updateDefault(result.data)
        })
        .catch((error) => console.log(error))
    },[])
    useEffect(() => {
        if(products && products.length != 0) updateCount(products.length)
    },[products])
    return(
            <>
                <div className = "search-wrapper">
                    <div className ="search-container">
                        <div className="search-bar">
                            <i className="search-icon fa fa-search"></i>
                            <input type="text" className="search" id = "search" placeholder = "Search" onChange = { changeHandler }/>
                        </div>
                        <div className="search-suggestions">
                            { item }
                        </div>
                    </div>
                    <Button click = { clickHandler } style = "Safe" text = "Search"/>
                </div>
                <div className="cards">
                    {
                        products.length != 0 ? products.map((product, index) => {
                        return(<Card index =  { index } key = { index }  ProductId = { product._id } UserId = { UserId } />)
                    }) : null }
                    {
                        def && products.length == 0 ? (def.filter((value,index) => {
                            console.log("Hello")
                            if(index < global_count) return(true)
                            return(false)
                        })).map((product,index) => {
                            return(<Card index =  { index } key = { index }  ProductId = { product._id } UserId = { UserId } />)
                        }) : null
                    }
                </div>
                    {
                        def && products.length == 0 ? global_count == def.length ? <p>You have reached to the end!</p> : <Button click = { checkCount } style = "Success" text = "Load More"/> : null
                    }
                { sub }
            </>
    )
}
export default Search
/*
<Card index = "0"  ProductId = "666b265213391b9f88fb6a7a" UserId = { UserId } />
                    <Card index = "1"  ProductId = "666b268813391b9f88fb6a80" UserId = { UserId } />
                    <Card index = "2"  ProductId = "666b271c13391b9f88fb6a8c" UserId = { UserId } />

{
                       def ? def.Products ? (def.Products.filter((value,index) => {
                            console.log("Hello")
                            if(index < global_count) return(true)
                            return(false)
                        })).map((product,index) => {
                            return(<Card index =  { index } key = { index }  ProductId = { product._id } UserId = { UserId } />)
                        }) : null : null
                    }
                    { def ? def.Products ? global_count == def.Products.length ? <p>You have reached to the end!</p> : <Button click = { checkCount } style = "Success" text = "Load More"/> : null : null }


                    */