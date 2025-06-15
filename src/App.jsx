import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import CreateGroup from "./pages/CreateGroup";
import UserListPage from "./pages/UserListPage";
import Dashboard from "./pages/dashboard";
import EditProfile from "./pages/EditProfile";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UserListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-group"
        element={
          <PrivateRoute>
            <CreateGroup />
          </PrivateRoute>
        }
      />
      <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
    </Routes>
  );
};

export default App;
