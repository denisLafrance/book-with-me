import React from 'react';
import {Link} from 'react-router-dom';
import {rentalType } from '../../../helpers/index'

const ReactCard = (props) => {
  
  
    return(
        <div className={props.colNum}>
              <Link className='rental-detail-link' to={`/rentals/${props.rentals._id}`}>
                <div className='card bwm-card'>
                  <img className='card-img-top' src={props.rentals.image} alt={props.rentals.title}></img>
                  <div className='card-block'>
                    <h6 className={`card-subtitle ${props.rentals.category}`}>{rentalType(props.rentals.shared)} {props.rentals.category} &#183; {props.rentals.city}</h6>
                    <h4 className='card-title'>{props.rentals.title}</h4>
                    <p className='card-text'>${props.rentals.dailyRate} per Night &#183; Free Cancelation</p>
                  </div>
                </div>
              </Link>
        </div>
    )
}

export default ReactCard;