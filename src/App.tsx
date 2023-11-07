import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import axios from "axios";
import "./App.css";
import ResponsiveAppBar from "./components/header";
import SignIn from "./components/header/login/loginform";

export type UserContext = {
  id?: string;
  iat?: number;
  exp?: number;
  isLoggedIn: boolean
  userName: string;
  color?: {
    name: string;
    code: string;
  }
}

function App() {
  const [userContext, setUserContext] = useState<UserContext>({
    userName: '',
    color: {
      name: '',
      code: ''
    },
    isLoggedIn: false
  });

  const getColor = async () => {
    axios.get(`${process.env.REACT_APP_SERVICE_URI as string}/getColor`, {withCredentials: true}).then(res => {
      setUserContext({
        userName: res?.data?.userName,
        isLoggedIn: true,
        color: res.data.color
      })
    })
  }

  useEffect(() => {
    if(localStorage.getItem('isLoggedIn') === 'true') {
      getColor()
    }
  }, [])

  if(localStorage.getItem('isLoggedIn') !== 'true') {
    return <SignIn setUserContext={setUserContext}/>
  }

  return (
    <BrowserRouter>
      <Routes>
        {userContext.color?.code && <Route path="/dashboard" element={<ResponsiveAppBar setUserContext={setUserContext} userContext={userContext} code={userContext.color?.code}/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
