import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
    //useState hook
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    //Destructuring data from form data, so we don't have to type
    // formData.name
    const { email, password } = formData;
    //napravili smo svoju onChange funkciju koja se aktivira svaki put kad 
    //dodje do promjene u name input polju
    //dosadasnji state formData se kopira pomocu spread operatora i sledeci parametar
    //govori da slusamo odakle je dosla promjena i uzmemo value
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    
    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    //Redirect if logged in
    if(isAuthenticated) {
        //react-router-dom ima Redirect koji vodi na drugu lokaciju.
        //When logged in, take it to the dashboard.
        return <Redirect to='/dashboard'/>
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign In Into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required/>
            </div>
            <div className="form-group">
                <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password} onChange={e => onChange(e)}
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
            Don't have an account? <Link to="/register">Register now</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
