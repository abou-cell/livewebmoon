import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-white shadow-lg rounded-2xl flex gap-4">
      <Link to="/" className="text-primary font-bold">
        Home
      </Link>
      <Link to="/login" className="text-primary">
        Login
      </Link>
      <Link to="/streamer" className="text-primary">
        Streamer Panel
      </Link>
    </nav>
  );
};

export default Navbar;
