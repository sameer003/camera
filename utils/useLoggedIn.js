import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login, refresh } from "../redux/reducers/user/user.actions";
import Router from "next/router";

export default function useLoggedIn(){
    const [loading, setLoading] = useState()

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user.loggedIn) {
          if (user.refresh_token) {
            refreshToken(user.refresh_token);
          } else {
            Router.push("/login");
          }
        }
      }, [user]);

    useEffect(() => {
        let myInterval;
        if (user.loggedIn) {
          myInterval = setInterval(() => {
            if (!checkLoggedIn(user.expires_time)) {
              dispatch(refresh());
            }
          }, 1000);
        }
        return () => {
          clearInterval(myInterval);
        };
      }, [user.loggedIn]);

      function refreshToken(refresh_token) {
        fetch("/api/refresh", {
          method: "POST",
          body: JSON.stringify({
            refresh_token,
            token: btoa(
              `${process.env.NEXT_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_SECRET}`
            ),
          }),
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error("wrong");
            }
          })
          .then((res) => {
            if (res) {
              dispatch(login(res));
            }
          })
          .catch(console.error);
      }

      function checkLoggedIn(expires_time) {
        return new Date() <= expires_time;
      }

      return [loading, setLoading];
}