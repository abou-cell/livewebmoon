import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-white shadow-md flex gap-4">
      <Link to="/" className="text-violet-600 font-bold">
        Home
      </Link>
      <Link to="/login" className="text-violet-600">
        Login
      </Link>
      <Link to="/streamer" className="text-violet-600">
        Streamer Panel
      </Link>
    </nav>
  );
};

export default Navbar;
