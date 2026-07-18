import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/">首页</Link>
      <Link to="/about">关于</Link>
      <Link to="/settings">设置</Link>
    </nav>
  );
};

export default Navigation;
