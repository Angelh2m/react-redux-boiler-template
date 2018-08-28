import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { withRouter } from "react-router-dom";
import TextFieldGroup from '../common/TextFieldGroup';



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
        const { user } = this.props.auth;

        return (
            <div>
                {user ? user.name : null}
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your DevConnector account</p>
                                <form onSubmit={this.onSubmit}>

                                    <TextFieldGroup
                                        name='name'
                                        placeholder='Name'
                                        value={this.state.name}
                                        error={errors.name}
                                        onChange={this.onChange}
                                    />

                                    <TextFieldGroup
                                        name='email'
                                        placeholder='Email address'
                                        type="email"
                                        value={this.state.email}
                                        error={errors.email}
                                        onChange={this.onChange}
                                    />

                                    <TextFieldGroup
                                        name='password'
                                        type='password'
                                        placeholder='Password'
                                        value={this.state.password}
                                        error={errors.password}
                                        onChange={this.onChange}
                                    />

                                    <TextFieldGroup
                                        name='password2'
                                        type='password'
                                        placeholder='Confirm password'
                                        value={this.state.password2}
                                        error={errors.password2}
                                        onChange={this.onChange}
                                    />


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

