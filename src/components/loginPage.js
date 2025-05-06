// App.jsx
import { useContext, useState } from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { toast } from "react-toastify";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { loginContext } from "../App";

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const {setLoadFlag,setButtonFlag} = useContext(loginContext);
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const loginHandler = () => {
    if (email === "professor@rgcet.com" && password === "rgcet") {
      toast.success("Login successful!");
      setLoadFlag(false)
      setButtonFlag(true)
    } else if (email === "students@rgcet.com" && password === "student@rgcet") {
      toast.success(" Student Login successful!");
      setLoadFlag(false)
      setButtonFlag(false)
    } else if (!email || !password) {
      toast.error("Please fill in all fields");
      setLoadFlag(true)
      return;
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center w-1/2 p-10">
        <h2 className="text-gray-600 text-lg mb-2">Start your journey</h2>
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Login to NextGen Meeting App
        </h1>

        <form className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            onClick={loginHandler}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="my-4 text-gray-500">or sign up with</div>
        <div className="flex space-x-4">
          <button className="p-3 border rounded-lg hover:bg-gray-100 transition">
            <FaFacebookF />
          </button>
          <button className="p-3 border rounded-lg hover:bg-gray-100 transition">
            <FaGoogle />
          </button>
          <button className="p-3 border rounded-lg hover:bg-gray-100 transition">
            <FaApple />
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-400 via-pink-400 to-purple-500">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: { value: "transparent" },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: { enable: true, mode: "repulse" },
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 100, duration: 0.4 },
              },
            },
            particles: {
              color: { value: "#ffffff" },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              move: { enable: true, speed: 2 },
              number: { density: { enable: true, area: 800 }, value: 50 },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
          }}
        />
        <div className="text-black text-center px-8 relative z-10">
          <h2 className="text-3xl font-bold mb-4">
            "Push yourself, because no one else is going to do it for you."
          </h2>
          <p className="text-lg">
            Every great journey begins with a single step. Let’s make it
            together.
          </p>
        </div>
      </div>
    </div>
  );
}
