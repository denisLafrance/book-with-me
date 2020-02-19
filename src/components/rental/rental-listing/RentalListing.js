import React, {Component} from 'react';
import RentalList from '././RentalList';
import { connect } from 'react-redux';
import * as actions from '../../../actions';




class RentalListing extends Component {
    UNSAFE_componentWillMount() {
       this.props.dispatch(actions.fetchRentals());
       
    }
    
    

    render(){
        const username = this.props.location.state.username;
        
        return(
            <section id='rentalListing'>
                <p className="username__heading">{username}</p>
                <h1 className='page-title'>Your Home All Around the World</h1>
                <RentalList rentals={this.props.rentals} />
          </section>
        )
    }
}

function mapStateToProps(state) {
    //console.log(state)
    return {
        rentals: state.rentals.data,
    }
}

export default connect(mapStateToProps)(RentalListing);