import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive ? "text-violet-500 font-bold" : "text-gray-600";

  return (
    <nav className="p-4 bg-white shadow-md flex space-x-4 mb-4">
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/login" className={linkClass}>
        Login
      </NavLink>
      <NavLink to="/dashboard" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/streamer" className={linkClass}>
        Streamer
      </NavLink>
    </nav>
  );
};

export default Navbar;
