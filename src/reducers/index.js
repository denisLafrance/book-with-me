
import { rentalReducer, selectedRentalReducer } from './rental-reducer';
import thunk from 'redux-thunk';
import {compose, createStore, applyMiddleware, combineReducers} from 'redux';


  export const init = () => {

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const reducer = combineReducers({
        rentals: rentalReducer,
        rental: selectedRentalReducer
    })

    const store = createStore(
      reducer,
      composeEnhancer(applyMiddleware(thunk))
    );
        

    return store; 
}




