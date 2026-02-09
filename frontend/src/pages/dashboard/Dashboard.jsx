import React, { useEffect } from 'react';
import './dashboard.css'
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import CourseCard from "../../components/courseCard/CourseCard";

const Dashboard = () => {
    const { myCourse, fetchMyCourse } = CourseData();  
    const { user } = UserData();

    
    useEffect(() => {
        if(user) fetchMyCourse();
    }, [user]);

    return (
        <div className="student-dashboard">
            <h2>All Enrolled courses</h2>
            <div className="dashboard-content">
                {
                    myCourse && myCourse.length>0 ? myCourse.map((e)=>(
                        <CourseCard key={e._id} course={e}/>
                    )) : (<p>No Enrolled courses</p>)
                }
            </div>
        </div>
    )
}  

export default Dashboard;
