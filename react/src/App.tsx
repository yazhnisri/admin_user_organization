import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import DataTable from './Components/DataTable';
import Header from './Components/Basics/header';
import Footer from './Components/Basics/footer';
import PrivateRoute from './Components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
              <ToastContainer />
      <Header />
              
            <Switch>
                <Route path="/login">
                    <Login setToken={setToken} />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <PrivateRoute path="/organizations" component={DataTable} />
            </Switch>
      <Footer />

        </Router>
    );
};

export default App;
