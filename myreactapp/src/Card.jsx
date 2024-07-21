import './Card.css'
import { useState, useEffect } from 'react'
import Button from './Button'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
function Card(props){
    const UserId = props.UserId
    const stripePromise = loadStripe("pk_test_51PR3e4BkmXJVU6jdcPsroJxbSsjkWAopA221SbYvX6yi8i72PRxLDtfxZ5MYXZBDSUEZXkU0NPqwdO6TNR53HQKZ00PlmaKHLP")
    const ProductId = props.ProductId
    const [ genre, updateGenre ] = useState(null)
    const [ author, updateAuthor ] = useState(null)
    const [ orders, updateOrder ] = useState(null)
    const [ data, updateData ] = useState(null)
    const [ Pay, updatePay ] = useState(false)
    const [ PaymentStatus, updatePayment ] = useState(false)
    const [ Liked, updateLikeStatus ] = useState(false);
    const downloadHandler = async (e) => {
      let blob = await fetch("http://localhost:5000/WallPapers/" + data.Image )
      .then((response) => response.arrayBuffer())
      .then((buffer) => new Blob([buffer],{ type: "image/jpeg"}))
      let link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = data.Name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    const ProceedToPay = async(e) => {
      const stripe = await stripePromise
      try{
        const response = await axios.post("http://localhost:5000/payment", { Amount: parseFloat(data.Price), Name: data.Name, UserId: UserId, ProductId: data._id })
        const error = await stripe.redirectToCheckout({ sessionId: response.data })

      }catch(error){
        console.log(error)
      }
    }
    useEffect(() => {
      axios.get("http://localhost:5000/api/products",{
        params: {
          id: ProductId
        }
      }).then((result) => {
        updateData({...result.data})
      }).catch((error) => console.log(error))
    },[])
    useEffect(() => {
      axios.get("http://localhost:5000/api/orders/Product",{
        params: {
          ProductId: ProductId
        }
      }).then((result) => {
        updateOrder([...result.data])
      }).catch((error) => console.log(error))
    },[data])
    useEffect(() => {
      if(data) updateLikeStatus(data.LikedBy.includes(UserId))
    },[data])
    useEffect(() => {
      if(orders){
        const exist = orders.filter((order,index) => {
          return(order.UserId === UserId)
        })
        updatePay( exist.length == 1 )
      }
    },[orders])
    useEffect(() => {
      if(data){
        axios.get("http://localhost:5000/api/genres",{
        params: {
          id: data.GenreId
        }
        }).then((result) => {
          updateGenre(result.data.Name)
        }).catch(error => console.log(error))
      }
    },[data])
    useEffect(() => {
      if(data){
        axios.get("http://localhost:5000/api/users",{
        params: {
          id: data.Author
        }
        }).then((result) => {
          updateAuthor(result.data.FullName)
        }).catch(error => console.log(error))
      }
    },[data])
    useEffect(() => {
      if(orders && orders.filter((value,index) => {
        return(value.UserId === UserId)
      }).length == 1) updatePayment(true)
      else updatePayment(false)
    },[orders])
    const clickHandler = (e) =>{
      axios.get("http://localhost:5000/api/products/UpdateLike",{
        params: {
          ProductId: ProductId,
          UserId: UserId,
          Like: !Liked
        }
      }).then((result) => {
        console.log(result)
        updateLikeStatus(!Liked)
      }).catch(error => console.log(error))
    }
    console.log("PaymentStatus: ")
    console.log(PaymentStatus)
    return (
    <>
        <div className = 'card-container'>
            <i className = { "fa "+( Liked ? "fa-thumbs-up" : "fa-thumbs-o-up" )+" like"} id = "like" onClick = { clickHandler } aria-hidden="true"></i>
            <div className="img-container">
            <img className = "image" src = { "http://localhost:5000/WallPapers/" + (data ? data.Image : null) }  alt = { data ? data.Name : null }></img>
            </div>
            <div className="text-container">
                <h2 className="heading">{ data ? data.Name : null }</h2>
                <p className="description">{ data ? data.Description : null }</p>
                <div className="interact">
                    <p className="price">{ data ? "$"+data.Price : null }</p>
                    <Button click = { () => {
                        document.getElementById("payment"+props.index).style.display = "flex";
                        updatePay(!Pay)
                    } } style = "Safe" text = "View" />
                </div>
            </div>
        </div>
        <div className="payment" id = {"payment"+ props.index }>
            <div className="payment-card">
              <div className="top-info">
                <div className="author-cred">
                  <img src = "/001.png" alt = "Profile Image" className="profile" />
                  <p className="name"><strong>{ author }</strong></p>
                </div>
                <div className="purchase-section">
                  <button onClick = { clickHandler } className="like"><i className = { "fa "+( Liked ? "fa-thumbs-up" : "fa-thumbs-o-up" )}></i></button>
                  {
                    PaymentStatus == false ?  <button onClick = { ProceedToPay } className="buy">Purchase</button> : <button onClick = { downloadHandler } className="buy">Download</button>
                  }
                </div>
              </div>
                <img src = { "http://localhost:5000/WallPapers/" + (data ? data.Image : null) } alt = { data ? data.Name : null } className="wallpaper" />
                <div className = "description">
                  <div className = "stats">
                    <div className="item">
                      <p className="title"><strong>Views</strong></p>
                      <p className="value">2M</p>
                    </div>
                    <div className="item">
                      <p className="title"><strong>Likes</strong></p>
                      <p className="value">{ data ? data.LikedBy.length : null }</p>
                    </div>
                    <div className="item">
                      <p className="title"><strong>Downloads</strong></p>
                      <p className="value">{ orders ? orders.length : null }</p>
                    </div>
                    <div className="item">
                      <p className="title"><strong>Genre</strong></p>
                      <p className="value">{ genre }</p>
                    </div>
                  </div>
                  <div className="other-items">
                  <div className="other-item">
                  <div className="favicon"><i className ='fa fa-thumbs-o-up'></i></div>
                    <p className="content"><strong>Published On: </strong><span>{ data ? (new Date(data.createdAt)).toDateString() : null }</span></p>
                  </div>
                  <div className="other-item">
                    <i className ='fa fa-thumbs-o-up'></i>
                    <p className="content"><strong>Published On: </strong><span>{ data ? (new Date(data.createdAt)).toDateString() : null }</span></p>
                  </div>
                </div>
                <h3 id = "Tag">Tags</h3>
                <div className="tags">
                  <p className="tag-item">
                    { data ? data.Name : null }
                  </p>
                  <p className="tag-item">
                    { genre }
                  </p>
                </div>
              </div>
            </div>
            <div onClick = { () => {
                document.getElementById("payment"+props.index).style.display = "none";
                updatePay(!Pay)
            }} className = "close-icon">
              &times;
            </div>
        </div>
    </>
    )
}
export default Card