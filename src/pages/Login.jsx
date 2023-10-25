import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GetUsers = () => {
  let lists = localStorage.getItem("user");
  if (lists) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return [];
  }
};
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [details, setDetails] = useState(GetUsers());

  const handleSubmit = async () => {
    if (user.email && user.password) {
      await setDetails((pre) => {
        return [...pre, user];
      });
      navigate("/home", { state: user.email });
    } else {
      alert("Fill all fields");
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(details));
  }, [details]);
  return (
    <div className="grid grid-cols-1 justify-center items-center ">
      <div className=" col-span-1 flex justify-center mt-44">
        <div className="card-shadow shadow-slate-200 w-[489px]  py-10 px-6 rounded-md">
          <div className="text-center text-[#121212]  font-bold text-[32px]">
            Login
          </div>
          <div className="text-[#424242] text-center font-bold py-2 text-base">
            Please login here!{" "}
          </div>
          <div className="flex flex-col gap-10">
            <input
              className="px-3 py-3 border border-blue-300 rounded-lg"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              className="px-3 py-3 border border-blue-300 rounded-lg"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
              onClick={() => handleSubmit()}
              className="bg-[#00ACEE] text-white py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
