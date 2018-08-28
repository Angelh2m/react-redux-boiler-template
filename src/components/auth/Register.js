import React, { Component } from 'react';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from "react-router-dom";



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

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('Will receive pprops ', nextProps);

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })

        }
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

        // *  〰️〰️〰️〰️〰️〰️  REDUX  〰️〰️〰️〰️〰️〰️〰️
        // *  〰️〰️〰️〰️ TRIGGER ACTION  〰️〰️〰️〰️〰️〰️〰️
        this.props.registerUser(newUser, this.props.history);

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


/* *
*  〰️〰️〰️〰️〰️〰️  REDUX  〰️〰️〰️〰️〰️〰️〰️
*/

// Define required data 
Register.protoTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

// Grab data from the store
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

// MapStateToProps // Action -> RootReducer // Class Name
export default connect(mapStateToProps, { registerUser })(withRouter(Register));

