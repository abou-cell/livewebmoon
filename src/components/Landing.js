import Navbar from "./Navbar";

const Landing = () => {
  return (
    <div className="p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur LiveWebMoon</h1>
      <p className="text-gray-700">Explore our streams or log in to start.</p>
    </div>
  );
};

export default Landing;
