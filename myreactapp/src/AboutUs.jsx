import  './AboutUs.css'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
function AboutUs(){
    const UserId = useLocation().state
    return(
        <div className = "AboutUs">
            <Navbar UserId = { UserId } />
            <div className="body">
                <div className="aboutUs-container">
                    <div className="info-container">
                        <h2>We provide opportunities to Artists so that they can make a living!</h2>
                        <p><span className = "V">Visua</span><span className = "A">tics</span> short for <span className = 'V'>Visual</span> <span className = 'A'>Asthetics</span> is home to an ever-growing community of Photographers and Hobbyists that cater to varying needs of asthetic wallpapers for the digital-fanatics that synches with their vibes!</p>
                    </div>
                    <div className="ourTeam">
                        <h2>Our Team</h2>
                        <div className="cards">
                            <div className = 'card-container'>
                                <img className = "image" src = './001.png' alt = "Profile Picture"></img>
                                <div className="text-container">
                                    <h2 className="heading">Vedant Vyas</h2>
                                    <p className="title">Lead Designer</p>
                                    <p className="description">"I have had a fun time working on this project and hope that people really like it. We specifically created it keeping in mind the likes and dis-likes, of the coming generation!"</p>
                                </div>
                            </div>
                            <div className = 'card-container'>
                                <img className = "image" src = './001.png' alt = "Profile Picture"></img>
                                <div className="text-container">
                                    <h2 className="heading">Sahil Pathan</h2>
                                    <p className="title">Senior Developer</p>
                                    <p className="description">"I have had a fun time working on this project and hope that people really like it. We specifically created it keeping in mind the likes and dis-likes, of the coming generation!"</p>
                                </div>
                            </div>
                            <div className = 'card-container'>
                                <img className = "image" src = './001.png' alt = "Profile Picture"></img>
                                <div className="text-container">
                                    <h2 className="heading">Prithvi Jadav</h2>
                                    <p className="title">Junior Developer</p>
                                    <p className="description">"I have had a fun time working on this project and hope that people really like it. We specifically created it keeping in mind the likes and dis-likes, of the coming generation!"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutUs