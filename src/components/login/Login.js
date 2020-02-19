import React, {Component} from 'react';
import LoginForm from './LoginForm';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Login extends Component {

    constructor() {
        super();
        
        this.state = {
            redirect: false,
            errors: [],
            userName: []
        }

        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(userData) {
        this.props.dispatch(actions.login(userData))
        //console.log(userData.email)
       this.setState({
            userName: userData.email
        })
        
    }

   

    render() {
        
        const {isAuth, errors} = this.props.auth;
        const { successRegister } = this.props.location.state || false;
        var username = this.state.userName;

        if(isAuth) {
            return <Redirect to={{pathname: "/rentals", state:{username}}} />
        } 
        

        return(
            <div>
                <section id="login">
                    <div className="bwm-form">
                        <div className="row">
                            <div className="col-md-5">
                            <h1>Login</h1>
                            {
                               successRegister &&
                               <div className='alert alert-success'>
                                <p>You have been successfully registered, please login now.</p>
                               </div> 
                            }
                            <LoginForm submitCb={this.loginUser} errors={errors} />
                            </div>
                            <div className="col-md-6 ml-auto">
                            <div className="image-container">
                                <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                                <img src={process.env.PUBLIC_URL + '/img/login-image.jpg'} alt=""/>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    
    return {
        auth: state.auth
    }
    
}

export default connect(mapStateToProps)(Login)