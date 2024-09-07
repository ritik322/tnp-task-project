import React, { useEffect, useState } from "react";
import "./Header.css";
import clgLogo from "../../Assets/logo.png";
import { Link, useParams } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Header = ({ isLogin, setIsLogin }) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 780);

  const handleLogout = () => {
    localStorage.setItem("isLogin", false);
    setIsLogin(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = {
    title: "",
    content: "",
    message: "Create Post",
    createPost: true,
  };
  const drawerContent = (
    <>
      <Link to="/home" className="option-container">
        <i className="fa-solid fa-house icon"></i>
        <span>Home</span>
      </Link>

      <Link
        style={{ color: "black", display: isLogin ? "flex" : "none" }}
        state={data}
        to="/create-post"
        className="option-container"
      >
        <i className="fa-solid fa-plus"></i>
        <span>Create Post</span>
      </Link>
      {isLogin === false ? (
        <Link to="/login" className="option-container">
          <i className="fa-solid fa-arrow-right-to-bracket"></i>
          <span>Login</span>
        </Link>
      ) : (
        <Link to="/home" className="option-container" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Logout</span>
        </Link>
      )}
    </>
  );

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <nav id="header-container">
      <div id="header">
        <div id="img-container">
          <img src={clgLogo} />
        </div>
        {isMobile ? (
          <>
            <IconButton id="menu-icon" onClick={toggleDrawer}>
              <i className="fa-solid fa-bars"></i>
            </IconButton>
            <Drawer
              id="user-options"
              anchor="right"
              open={open}
              onClose={toggleDrawer}
              sx={{
                width: "200px",
                flexShrink: 0,
                "& .MuiDrawer-paper": { width: "200px" },
              }}
            >
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <div id="user-options">{drawerContent}</div>
        )}
      </div>
    </nav>
  );
};

export default Header;
