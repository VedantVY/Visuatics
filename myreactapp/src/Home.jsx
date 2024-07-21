import './Home.css'
import Navbar from './Navbar'
import Search from './Search'
import { useEffect, useState } from 'react'
import Toast from './Toast'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
function Home(){
  const [ global_count, updateCount ] = useState(3)
  const { state } = useLocation()
  const [ searchParams, updateSearchParams ] = useSearchParams()
  const [ status, updateStatus ] = useState([false,false])
  const style = {
    top: (200 + ((global_count/3) - 1)*300)+"px"
  }
  useEffect(() => {
    if(searchParams.get("LogIn")) updateStatus(status.map((value,index) => {
      if(index == 0) return true
      return value
    }))
    else if(searchParams.get("payment")  === "Success") updateStatus(status.map((value,index) => {
      if(index == 1) return true
      return value
    })) 
  },[])
  console.log(state)
  return (
  <div className = 'Home'>
    <Navbar UserId = { state } />
    <div style = { style } className="body">
      <div className="text">
        <h1><span>Visua</span>tics</h1>
        <h2>A single stop<br /> solution to all your<br/> asthetic needs!</h2>
      </div>
      <Search UserId = { state } count = { global_count } update = { updateCount }/>
    </div>
    { status[0] ? <Toast type = "Success" title = "Logged-in" text = "You have logged-in successfully. Have a look around!"/> : null }
    { status[1] ? <Toast type = "Success" title = "Payment Succeeded" text = "The wallpaper should now appear in your library!"/> : null }
  </div>
  )
}
export default Home