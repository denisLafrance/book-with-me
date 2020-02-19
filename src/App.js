import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

//Import REDUX
import { Provider } from 'react-redux';

import Header from './components/shared/Header';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
import Login from './components/login/Login';
import Register from './components/register/Register';

import ProtectedRoute from './components/shared/auth/ProtectedRoute';
import LoggedinRoute from './components/shared/auth/LoggedinRoute';

import * as actions from './actions';

import './App.css';

import {init} from './reducers/index';
const store = init();

class App extends Component {

  componentWillMount() {
    store.dispatch(actions.checkAuthState());
    
  }

  logout() {
    store.dispatch(actions.logout());
  }


  render() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header logout={this.logout} />
          <div className='container'>
            <Route exact path="/" render ={ () =>  <Redirect to="/rentals" /> } />
            <Route exact path="/rentals" component={RentalListing} />
            <ProtectedRoute exact path="/rentals/:id" component={RentalDetail}/>
            <Route exact path="/login" component={Login} />
            <LoggedinRoute exact path="/register" component={Register} />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
   );
  }
}

export default App;
