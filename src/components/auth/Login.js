import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classNames from 'classnames';



class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {

            }
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
        console.log(nextProps.auth);

        if (nextProps.auth.isAuthenticated) {
            console.warn('Authenticated now redirect');

            this.props.history.push('/dashboard');
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const userLogin = {
            email: this.state.email,
            password: this.state.password,
        }

        // *  〰️〰️〰️〰️〰️〰️  REDUX  〰️〰️〰️〰️〰️〰️〰️
        // *  〰️〰️〰️〰️ TRIGGER ACTION  〰️〰️〰️〰️〰️〰️〰️
        this.props.loginUser(userLogin);

    }

    render() {

        const { errors } = this.state;
        const defaultStyle = 'form-control form-control-lg';

        return (
            <div>
                <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Log In</h1>
                                <p className="lead text-center">Sign in to your DevConnector account</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="email"
                                            className={classNames(defaultStyle, { 'is-invalid': errors.email })}
                                            placeholder="Email Address"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            name="email" />
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


// Define required data 
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

// Grab data from the store
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { loginUser })(Login);