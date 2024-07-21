import './Library.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
function Library(){
    const UserId = useLocation().state
    const [ likes, updateLike] = useState(0)
    const [ authored, updateAuthored] = useState(0)
    const [ orders, updateOrder] = useState(null)
    const [ authors, updateAuthor ] = useState(null)
    const [ genres, updateGenre ] = useState(null)
    const [ data, updateData] = useState(null)
    useEffect(() => {
        axios.post("http://localhost:5000/api/orders/user",{ UserId }).then((result) => {
            updateOrder(result.data)
        }).catch(error => console.log("Err: "+error))
        axios.get("http://localhost:5000/api/products/Authored",{
            params: {
                UserId: UserId
            }
        }).then((result) => {
            updateAuthored(result.data.length)
        }).catch((error) => console.log(error))
    },[])
    useEffect(() => {
        axios.get("http://localhost:5000/api/products/Likes",{
            params: {
                UserId: UserId
            }
        }).then((result) => {
            updateLike(result.data.length)
        }).catch((error) => console.log(error))
    },[])
    useEffect(() => {
        const products = []
        for(let order in orders){
            axios.get("http://localhost:5000/api/products",{
                params: {
                      id: orders[order].ProductId
                }
            }).then((result) => {
                products.push(result.data)
                updateData([...products])
            })
            .catch(error => console.log("Err: "+error))
        }
    },[orders])
    useEffect(() => {
        let Genres = []
        for(let info in data){
            axios.get("http://localhost:5000/api/genres",{
                params: {
                    id: data[info].GenreId
                }
            }).then((result) => {
                Genres.push(result.data)
                updateGenre([...Genres])
            }).catch((error) => console.log(error))
        }
    },[data])
    useEffect(() => {
        let Authors = []
        for(let info in data){
            axios.get("http://localhost:5000/api/users",{
                params: {
                    id: data[info].Author
                }
            }).then((result) => {
                Authors.push(result.data)
                updateAuthor([...Authors])
            }).catch((error) => console.log(error))
        }
    },[data])
    return(
    <div className = 'Library'>
        <Navbar UserId = { UserId } />
        <div className="body">
            <div className="general-info">
                <div className="info-card">
                    <div className="text-container">
                        <h3>Authored</h3>
                        <p>{ authored === 0 ? "---" : authored }</p>
                    </div>
                    <div className="image">
                        <img src="/001.png" alt = "" />
                    </div>
                </div>
                <div className="info-card" id = "red">
                    <div className="text-container">
                        <h2>Orders</h2>
                        <p>{ orders ? orders.length == 0 ? "---" : orders.length : null }</p>
                    </div>
                    <div className="image">
                        <img src="/001.png" alt = "" />
                    </div>
                </div>
                <div className="info-card" id = "blue">
                    <div className="text-container">
                        <h2>Likes</h2>
                        <p>{ likes === 0 ? "---" : likes }</p>
                    </div>
                    <div className="image">
                        <img src="/001.png" alt = "" />
                    </div>
                </div>
            </div>
            <div className="library-table-container">
                <table className="library-table">
                    <thead>
                        <tr className="heading">
                            <th id = "OrderID">Order ID</th>
                            <th id = "Author">Author</th>
                            <th id = "Image">Image</th>
                            <th id = "Liked">Liked</th>
                            <th id = "PublishedOn">Published On</th>
                            <th id="Genre">Genre</th>
                            <th id = "BoughtAt">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        data ? data.length != 0 ? data.map((product,index) => {
                            return(
                                <tr key = { index } bgcolor = "white" className="item">
                                    <td>{ index+1 }</td>
                                    <td>{ authors ? authors[index] ? authors[index].User : null : null}</td>
                                    <td><img src = { "http://localhost:5000/WallPapers/" + product.Image } alt = "Image"></img></td>
                                    <td>{ product.LikedBy.includes(UserId) ? "Yes" : "No" }</td>
                                    <td>{ (new Date(product.createdAt)).toDateString() }</td>
                                    <td>{ genres ? genres[index] ? genres[index].Name : null : null }</td>
                                    <td>{ "$"+orders[index].Price }</td>
                                </tr> 
                            )
                            })  : <tr bgcolor = "white" className = 'item'><td colSpan = "7">No orders have been made so far...</td></tr>
                            : <tr bgcolor = "white" className = 'item'><td colSpan = "7">Loading</td></tr>
                        }
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            </div>
        </div>
    </div>
    )
}
export default Library