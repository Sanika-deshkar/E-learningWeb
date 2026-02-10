import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import api from "../../api"; 
import "./dashboard.css";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);
 
  
  const fetchStats = async () => {
    try {
      const { data } = await api.get("/api/stats",{
        headers:{
          token: localStorage.getItem("token"),
        },
      }); 
      setStats(data.stats);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

 useEffect(() => {
    fetchStats();
}, []);


  return (
    
      <div className="main-content">
        <div className="box">
          <p>Total Courses</p>
          <p>{stats.totalCourses || 0}</p>
        </div>

        <div className="box">
          <p>Total Lectures</p>
          <p>{stats.totalLectures || 0}</p>
        </div>

        <div className="box">
          <p>Total Users</p>
          <p>{stats.totalUsers || 0}</p>
        </div>
      </div>
    
  );
};

export default AdminDashboard;
