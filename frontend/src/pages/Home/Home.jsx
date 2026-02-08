import React from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'
import Testimonials from '../../components/testimonials/Testimonials'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className="home">
            <div className="home-content">
                <h1>Welcome to EduHub!</h1>
                <h2>An E-learning Platform</h2>
                <br/>
                <p>Learn, grow, Excel</p>
                <button onClick={()=>{navigate("/courses")}} className='common-btn'>Get Started!</button>
            </div>
        </div>
        <Testimonials />
    </div>
  )
}

export default Home