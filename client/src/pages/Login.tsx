import { useState, type SyntheticEvent } from "react";

export default function Login() {
  return (
    <>
      <MyForm />
    </>
  );
}

function MyForm(props: any) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Email and password are required");
      return;
    }

    const baseurl = import.meta.env.VITE_API_URL;
    const endpoint = baseurl + (isSignup ? "/auth/signup" : "/auth/login");

    if (isSignup && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        console.log(error);
        alert(error?.message || "Something went wrong");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // 4. Success handling
      alert("Success! Redirecting...");
      // e.g., save token to localStorage or redirect via router
    } catch (error: any) {
      // 5. Error handling
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96 space-y-5">
        <h2 className="text-2xl font-semibold text-center">{isSignup ? "Create Account" : "Login"}</h2>
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">{isSignup ? "New " : ""}Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </label>

        {isSignup && (
          <label className="block">
            <span className="text-gray-700">Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </label>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          {isSignup ? "Sign UP" : "Login"}
        </button>

        <button type="button" className="w-full text-blue-500 py-2 rounded-lg hover:cursor-pointer transition" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
}
