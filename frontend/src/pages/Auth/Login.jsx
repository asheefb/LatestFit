import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // ✅ Check token when component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await AuthService.login(email, password); // ensure this returns a promise
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("roles", JSON.stringify(data.roles));
      setIsLoggedIn(true);
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed: " + (error.message || "Unknown error"));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    setIsLoggedIn(false);
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="p-8 flex justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 shadow-md rounded-lg w-96"
      >
        {isLoggedIn ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">
              You are logged in
            </h2>
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-600 text-white w-full py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-indigo-600 text-white w-full py-2 rounded">
              Login
            </button>
            <div className="ml-8">
              <h5 className="text-lg font-semibold mb-2">
                Don't have an account?
              </h5>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
