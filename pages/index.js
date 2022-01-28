import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import {useEffect} from 'react';

export default function Home() {
  useEffect(() => {
    let token = '';
    fetch('/api/login').then(res=>res.json()).then(res=>{

      token = res.data.access_token
      fetch('api/cameras', {
        method: "POST",
        body:JSON.stringify({access_token:res.data.access_token})
      }).then(res=> res.json()).then(res=>{

        res.data.forEach(({cameraId})=>{
          fetch(`api/cameras/${cameraId} `, {
            method: "POST",
            body:JSON.stringify({access_token:token})
          })
        })
      });
    });

    // fetch(
    //   `https://rest.cameramanager.com/oauth/token?grant_type=password&scope=write&username=${process.env.NEXT_PUBLIC_USERNAME}&password=${process.env.NEXT_PUBLIC_PASSWORD}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Headers":
    //         "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    //       "Access-Control-Request-Method": "GET, POST, DELETE, PUT, OPTIONS",
    //       Authorization:
    //         "Basic " +
    //         btoa(`${process.env.NEXT_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_SECRET}`),
    //     },
    //   }
    // ).then(res => res.json()).then(res => {
      // fetch(
      //   `http://localhost:8010/proxy/oauth/token?grant_type=refresh_token&scope=write&refresh_token=${res.refresh_token}`,
      //   {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Access-Control-Allow-Origin": "*",
      //       "Access-Control-Allow-Headers":
      //         "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      //       "Access-Control-Request-Method": "GET, POST, DELETE, PUT, OPTIONS",
      //       Authorization:
      //         "Basic " +
      //         btoa("dev_test" + ":" + "3H1Bf6mCctIgpCuzvrnyekf3VhAUEnKJ"),
      //     },
      //   }
      // )
      // fetch('https://rest.cameramanager.com/rest/v2.4/timeZones', {
      //   method: "GET",
      //   headers:{
      //     Accept: "application/json, text/plain, */*",
      //     "Accept-Encoding": "gzip, deflate, br",
      //     "Accept-Language": "en-US,en;q=0.9",

      //   //    "Content-Type": "application/json",
      //   //  "Access-Control-Allow-Origin": "*",
      //   //   "Access-Control-Allow-Headers":
      //   //    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      //     'Authorization': 'Bearer ' + (res.access_token)
      //   }
      // });
    // });
  }, []);
  return (
    <div className={styles.container}>
      hello
    </div>
  )
}
