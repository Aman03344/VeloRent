// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const useAuthStatus = () => {
//   const { user } = useSelector((state) => state.auth);

//   const [isLogged, setIsLogged] = useState(false);
//   const [isChecking, setIsChecking] = useState(true);

//   useEffect(() => {
//     user ? setIsLogged(true) : setIsLogged(false);
//     setIsChecking(false);
//   }, [user]);

//   return { isChecking, islogged };
// };

// export default useAuthStatus;


"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useAuthStatus = () => {
  const { user } = useSelector((state) => state.auth)

  const [isLogged, setIsLogged] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    user ? setIsLogged(true) : setIsLogged(false)
    setIsChecking(false)
  }, [user])

  return { isChecking, isLogged }
}

export default useAuthStatus
