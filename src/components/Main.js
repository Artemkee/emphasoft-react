import { HashRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './home/Home';
import Login from './login/Login';

const Main = () => {
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  }

  // HashRouter used instead of BrowserRouter in github pages;
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default Main;
