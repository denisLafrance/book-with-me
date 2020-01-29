import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import RentalDetailInfo from './RentalDetailInfo';
import RentalMap from './RentalMap';

class RentalDetail extends Component {
    
    UNSAFE_componentWillMount() {
        //Dispatch action
        const rentalId = this.props.match.params.id
        console.log(rentalId)
        this.props.dispatch(actions.fetchRentalById(rentalId))
    }

    render() {
        const rental = this.props.rental;

        if(rental.title) {
            return(
                <section id='rentalDetails'>
                    <div className='upper-section'>
                        <div className='row'>
                        <div className='col-md-6'>
                            <img src={rental.image} alt=''></img>
                        </div>
                        <div className='col-md-6'>
                            <RentalMap location={`${rental.city}, ${rental.street}`}/>
                        </div>
                        </div>
                    </div>

                    <div className='details-section'>
                        <div className='row'>
                        <div className='col-md-8'>
                            <RentalDetailInfo rental={rental}/>
                        </div>
                        <div className='col-md-4'> BOOKING</div>
                        </div>
                    </div>
                </section>

            )
        } else {
            return(
                <h1>Loading....</h1>
            )
        }
        
    }
}

function mapStateToProps(state) {
    //console.log(state)
    return {
        rental: state.rental.data
    }
}

export default connect(mapStateToProps)(RentalDetail);