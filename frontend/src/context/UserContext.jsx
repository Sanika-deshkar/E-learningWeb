import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate, fetchMyCourse) {
  setBtnLoading(true);
  try {
    const { data } = await api.post("/api/user/login", { email, password });

    
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast.success(data.message);
    setUser(data.user);
    setIsAuth(true);

    navigate("/");
    fetchMyCourse();
  } catch (error) {
    setIsAuth(false);
    toast.error(error.response?.data?.message || "Login Failed");
  } finally {
    setBtnLoading(false);
  }
}

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await api.post("/api/user/register", { name, email, password });

      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  }

  async function verifyOtp(otp, navigate) {
  setBtnLoading(true);
  const activationToken = localStorage.getItem("activationToken");
  try {
    
    const { data } = await api.post("/api/user/verify", {
      otp,
      activationToken,
    });

    toast.success(data.message);
    setBtnLoading(false);
    navigate("/login"); 
    localStorage.clear(); 
  } catch (error) {
    setBtnLoading(false);
    toast.error(error.response?.data?.message || "Verification Failed");
  }
}

  async function fetchUser() {
  try {
    const { data } = await api.get("/api/user/me");
    setIsAuth(true);
    setUser(data.user);
  } catch (error) {
    
    setIsAuth(false);
    setUser(null);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);