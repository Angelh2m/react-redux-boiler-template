import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
/* *
*  REDUX SETUP (3)
*/
import { Provider } from 'react-redux';
import { store } from './store';
// Styles
import './App.css';
// Components
import { Navbar } from './layout/Navbar';
import { Landing } from './layout/Landing';
import Footer from './layout/Footer';
import Register from './components/auth/Register';
import { Login } from './components/auth/Login';


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
