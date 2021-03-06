import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';

import {
          FETCH_RENTAL_BY_ID_SUCCESS, 
          FETCH_RENTAL_BY_ID_INIT, 
          FETCH_RENTALS_SUCCESS,
          LOGIN_SUCCESS,
          LOGIN_FAILURE,
          LOGOUT
        } from './types';




// RENTALS ACTIONS ------------------------------

const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  }
}

  const fetchRentalByIdSuccess = (rental) => {
    return {
      type: FETCH_RENTAL_BY_ID_SUCCESS,
      rental: rental
    }
  }

const fetchRentalsBySuccess = (rentals) => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals: rentals
  }
}

export const fetchRentals = () => {
    return dispatch => {
      axiosInstance.get('/rentals')
        .then( res => res.data)
        .then( rentals => {
          dispatch(fetchRentalsBySuccess(rentals))
        })
    }
    
}

 

export const fetchRentalById = (rentalId) => {
    return function(dispatch) {
      dispatch(fetchRentalByIdInit())

      axios.get(`/api/v1/rentals/${rentalId}`)
        .then( (res) => res.data)
        .then(rental => {
          dispatch(fetchRentalByIdSuccess(rental))
        })

  }
}


// AUTH ACTIONS ------------------------------

export const register = (userData) => {
  return axios.post('/api/v1/users/register', {...userData}).then(
    (res) => {
      return res.data
    },
    (err) => {
     return Promise.reject(err.response.data.errors)
     
    })
}

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors: errors
  }
}

export const checkAuthState = () => {
  return dispatch => {
    if(authService.isAuthenticated()) {
      dispatch(loginSuccess())
    }
  }
}




export const login = (userData) => {
  return dispatch => {
    return axios.post('/api/v1/users/auth', {...userData})
      .then(res => res.data)
      
      .then(token => {
        //localStorage.setItem('auth_token', token)
        authService.saveToken(token)
        dispatch(loginSuccess())
        //console.log(token)
      })
      .catch( (error) => {
        dispatch(loginFailure(error.response.data.errors));
      })
  }
}



export const logout = () => {
  authService.invalidateUser()
  return {
    type: LOGOUT
  }
}



