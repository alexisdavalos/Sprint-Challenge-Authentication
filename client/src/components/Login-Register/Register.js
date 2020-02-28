import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, actionName } from '../../actions'

const Login = props => {
    const history= useHistory();
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState(false);
    console.log(form)
    console.log('Props in Login.js:', props)
    const handleChanges = (e) => {
        setError(false)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleRegister = (e) => {
        console.log('loggin in..')
        e.preventDefault();
        if (form.username !== '' && form.password !== '') {
            props.login(form);
            setError(false);
            history.push("/login")
        } else {
            setError(true);
        }
    }
    return (
        <div className="form">
            <div className='selector'>
                <h1>Welcome! Please Register</h1>
                <Link to="/login">
                    <button className="button is-dark is-large">Login</button>
                </Link>
                <Link to="/register">
                    <button className="button is-dark is-large">Register</button>
                </Link>
            </div>
            <form>
                <div className="field">
                    <label className="label is-large has-text-white is-pulled-left">Username</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input"
                            name='username'
                            type="text"
                            placeholder="Username"
                            value={form.username}
                            onChange={(e) => handleChanges(e)}
                        />
                        {(error) ? <p className="help is-danger">This username is invalid</p> : <></>}
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label is-large has-text-white is-pulled-left">Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input"
                            name='password'
                            type="password"
                            placeholder="password"
                            value={form.password}
                            onChange={(e) => handleChanges(e)}
                        />
                        {(error) ? <p className="help is-danger">This password is invalid</p> : <></>}
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </div>
                </div>
                <button onClick={(e) => handleRegister(e)} className="button is-dark is-large is-rounded">Register</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth: {
            isLoggedIn: state.auth.isLoggedIn,
            isFetching: state.auth.isFetching,
            error: state.auth.error
        }
    }
}
export default connect(
    mapStateToProps,
    //place imported actions below
    { login, actionName }
)(Login);