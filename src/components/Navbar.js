import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `transition-colors ${
      isActive
        ? "text-violet-500 font-bold"
        : "text-gray-600 hover:text-violet-500"
    }`;

  return (
    <nav
      aria-label="Main navigation"
      className="p-4 bg-white shadow-md mb-4"
    >
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/streamer" className={linkClass}>
            Streamer
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

