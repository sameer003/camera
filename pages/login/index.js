import React, { useState, useEffect } from "react";
import Loader from "../../components/common/loader/loader";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/reducers/user/user.actions";
import Router from "next/router";

const Login = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Redirect User to dashboard of logged in
  useEffect(() => {
    if (user.loggedIn) {
      Router.push("/");
    }
  }, [user]);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;

    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password,
        token: btoa(
          `${process.env.NEXT_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_SECRET}`
        ),
      }),
    })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Incorrect username or password!");
        }
      })
      .then((res) => {
        setLoading(false);
        if (res) {
          dispatch(login(res));
        }
      })
      .catch(err => {setError(err.message)});
  };
  return (
    <div className="h-screen flex bg-gray-bg1">
      {loading && <Loader />}
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Log in to your account 🔐
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Your Password"
              required
            />
          </div>
          {error && <div className="flex justify-center text-red-500 italic text-sm">*{error}</div>}
          <div className="flex justify-center items-center mt-6">
            <button
              className={`bg-green-500 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
