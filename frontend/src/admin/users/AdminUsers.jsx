import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import toast from "react-hot-toast";
import api from '../../api'

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
  if (user && user.role !== "admin") {
    navigate("/");
  }
}, [user, navigate]);


  const [users, setUsers] = useState([]);

  async function fetchUsers() {
  try {
    const { data } = await api.get("/api/users",{
      headers:{
        token: localStorage.getItem("token"),
      }
    });
    setUsers(data.users);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}


  useEffect(() => {
    fetchUsers();
  }, []);

   const updateRole = async (id, role) => {
    if (window.confirm("Are you sure you want to update this user role?")) {
      try {
        const { data } = await api.put(`/api/user/${id}`, {
          role,
        });

        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Error");
      }
    }
  };

  console.log(users);
  return (
    
      <div className="users">
        <h1>All Users</h1>
        <table border={"black"}>
          <thead>
            <tr>
              <td>#</td>
              <td>name</td>
              <td>email</td>
              <td>role</td>
              <td>update role</td>
            </tr>
          </thead>

          {users &&
            users.map((e, i) => (
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.role}</td>
                  <td>
                    <button
                      onClick={() => updateRole(e._id)}
                      className="common-btn"
                    >
                      Update Role
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
  );
};

export default AdminUsers;