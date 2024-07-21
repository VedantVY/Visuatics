import './App.css'
import { Routes,Route } from 'react-router-dom'
import Navbar from './Navbar'
import Card from './Card'
import Library from './Library'
import Search from './Search'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Contribute from './Contribute'
import Register from './Register'
import Home from './Home'
import Payment from './Payment'
import UpdateProfile from './UpdateProfile'
import LogIn from './LogIn'
import Test from './Tetst'
function App(){
  return (
    <>
      <Routes>
        <Route path = "/" element = { <Register /> } />
        <Route path = "Home" element = { <Home /> } />
        <Route path = "ContactUs" element = { <ContactUs /> } />
        <Route path = "AboutUs" element = { <AboutUs /> } />
        <Route path = "Contribute" element = { <Contribute /> } />
        <Route path = "UpdateProfile" element = { <UpdateProfile /> } />
        <Route path = "Library" element = { <Library /> } />
        <Route path = "LogIn" element = { <LogIn /> } />
        <Route path = "Payment" element = { <Payment /> } />
        <Route path = "Test" element = { <Test /> }  />
      </Routes>
    </>
  )
}
export default App

/*
For Main Home Setup
import Card from './Card'
import Navbar from './Navbar'
import Toast from './Toast'
      <Navbar/>
      <div className="cards">
        <Card link = "/ac-shadows.png" name = "AC Shadows" description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam hic facilis doloremque magni, asperiores, nisi, in qui earum quia molestias harum optio pariatur quis aliquid velit rerum eveniet! Atque, repellendus!"/>
        <Card link = "/rdr2.jpeg" name = "Red Dead Redemption 2" description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam hic facilis doloremque magni, asperiores, nisi, in qui earum quia molestias harum optio pariatur quis aliquid velit rerum eveniet! Atque, repellendus!"/>
        <Card link = "/witcher3.jpeg" name = "Witcher 3: The Wild Hunt" description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam hic facilis doloremque magni, asperiores, nisi, in qui earum quia molestias harum optio pariatur quis aliquid velit rerum eveniet! Atque, repellendus!"/>
      </div>
      <Toast type = "Success" title = "Congrats!" text = "You have logged-in successfully!"/>
      <Register />
      <Routes>
      <Route path = "/" element = { <Register /> }/>
      <Route path = "Home" element = { <Home /> }/>
    </Routes>

    (Last Update For Cards & User-Profile)
    <Navbar/>
      <div className="body">
        <div className="cards">
          <Card price = "5.45" link = "/rdr2.jpeg" name = "Red Dead Redemption 2" description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam hic facilis doloremque magni, asperiores, nisi, in qui earum quia molestias harum optio pariatur quis aliquid velit rerum eveniet! Atque, repellendus!"/>
        </div>
      </div>
*/