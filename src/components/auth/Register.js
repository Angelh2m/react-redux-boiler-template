import React, { Component } from 'react';
import Axios from 'axios';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        }
        console.log(newUser);

        // *** Pass data to reducer
        this.props.registerUser(newUser);
        // Axios.post('/api/users/register', newUser)
        //     .then(res => console.log(res.data))
        //     .catch(err => this.setState({ errors: err.response.data }))

    }

    render() {
        const { errors } = this.state;
        const defaultStyle = 'form-control form-control-lg';
        const { user } = this.props.auth;

        return (
            <div>
                {user ? user.name : null}
                <div className="register">
                    <div className="container">
                        <div className="row">
                            {console.log(errors)}
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your DevConnector account</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                            className={classNames(defaultStyle, { 'is-invalid': errors.name })}
                                            placeholder="Name"
                                            value={this.state.name}
                                            onChange={this.onChange}
                                            name="name" />
                                    </div>
                                    {errors.name && (<div className="invalid">{errors.name}</div>)}

                                    <div className="form-group">
                                        <input type="email"
                                            className={classNames(defaultStyle, { 'is-invalid': errors.email })}

                                            placeholder="Email Address"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            name="email" />
                                        <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                    </div>
                                    {errors.email && (<div className="invalid">{errors.email}</div>)}

                                    <div className="form-group">
                                        <input type="password"
                                            className={classNames(defaultStyle, { 'is-invalid': errors.password })}

                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                            name="password" />
                                    </div>
                                    {errors.password && (<div className="invalid">{errors.password}</div>)}


                                    <div className="form-group">
                                        <input type="password"
                                            className={classNames(defaultStyle, { 'is-invalid': errors.password2 })}

                                            placeholder="Confirm Password"
                                            value={this.state.password2}
                                            onChange={this.onChange}
                                            name="password2" />
                                    </div>
                                    {errors.password2 && (<div className="invalid">{errors.password2}</div>)}


                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


/* * ------------------------------------------------
*           [ STEP ONE ]
*            DISPATCHER
* This has the state blue print and action
*---------------------------------------------------/*/

/*
export const registerUser = (userData) => {
    return {
        type: TEST_DISPATCH,
        payload: userData
    }
}
*/


/* * ------------------------------------------------
*           [ STEP TWO ]
*      TRIGGER THE DISPATCHER
*---------------------------------------------------/*/

/*
 this.props.registerUser(newUser);
*/


// 1. - null
// 2 - registerUser =>

Register.protoTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})


export default connect(mapStateToProps, { registerUser })(Register);

