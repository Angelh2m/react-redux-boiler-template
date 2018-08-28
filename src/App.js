import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
/* *
*  REDUX SETUP (3)
*/
import { Provider } from 'react-redux';
import { store } from './store';
// Styles
import './App.css';
// Class Components
import Navbar from './layout/Navbar';
import { Landing } from './layout/Landing';
// Functional Components
import Footer from './layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// Veryfy token
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

//

if (localStorage.jwtToken) {
  // Set auth token in header of axios
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user token info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated in Store
  console.warn('From app.js', decoded);
  store.dispatch(setCurrentUser(decoded));

  // Redirect to login
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout User
    store.dispatch(logoutUser());
    //Clear current profile
    // @TODO
    // redirect User
    window.location.href = '/login';
  }


}


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />

            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
