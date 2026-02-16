import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Common Components */
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loading";

/* Pages */
import Home from "./pages/Home/Home";
import About from "./pages/about/About";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Lecture from "./pages/lectures/Lecture";
import Dashboard from "./pages/dashboard/Dashboard";
import Account from "./pages/account/Account";

/* Auth Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

/* Payment */
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";

/* Admin Pages */
import AdminDashboard from "./admin/dashboard/AdminDasboard";
import AdminCourses from "./admin/courses/AdminCourses";
import AdminUsers from "./admin/users/AdminUsers";

/* Admin Layout */
import Layout from "./admin/utils/Layout";

/* Context */
import { UserData } from "./context/UserContext";


const App = () => {
  const { isAuth, user, loading } = UserData();

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      <Header isAuth={isAuth} />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />

        {/* ================= AUTH ROUTES ================= */}
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={isAuth ? <Home /> : <Register />} />
        <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
        <Route
              path="/forgot"
              element={isAuth ? <Home /> : <ForgotPassword />}
            />

        <Route
              path="/reset-password/:token"
              element={isAuth ? <Home /> : <ResetPassword />}
            />

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/account"
          element={isAuth ? <Account user={user} /> : <Login />}
        />

        <Route
          path="/course/:id"
          element={isAuth ? <CourseDescription user={user} /> : <Login />}
        />

        <Route
          path="/course/study/:id"
          element={isAuth ? <CourseStudy user={user} /> : <Login />}
        />

        <Route
          path="/lectures/:id"
          element={isAuth ? <Lecture user={user} /> : <Login />}
        />

        <Route
          path="/payment-success/:id"
          element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
        />

        {/* USER DASHBOARD (NO CONFLICT NOW) */}
        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard user={user} /> : <Login />}
        />

        {/* ================= ADMIN ROUTES ================= */}
        {/* ADMIN ROUTES */}
<Route path="/admin" element={isAuth ? <Layout /> : <Login />}>
  <Route path="dashboard" element={<AdminDashboard user={user} />} />
  <Route path="course" element={<AdminCourses user={user} />} />
  <Route path="users" element={<AdminUsers user={user} />} />
</Route>

      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
