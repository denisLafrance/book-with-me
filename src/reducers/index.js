

import thunk from 'redux-thunk';
import {compose, createStore, applyMiddleware, combineReducers} from 'redux';

import { rentalReducer, selectedRentalReducer } from './rental-reducer';
import { authReducer } from './auth-reducer';

import { reducer as formReducer} from 'redux-form';

  export const init = () => {

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const reducer = combineReducers({
        rentals: rentalReducer,
        rental: selectedRentalReducer,
        form: formReducer,
        auth: authReducer
    })

    const store = createStore(
      reducer,
      composeEnhancer(applyMiddleware(thunk))
    );
        

    return store; 
}




