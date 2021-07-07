import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { login, getUsers} from '../../actions'

//components
import UsersWrapper from '../Users/UsersWrapper.js'

const Home = (props) =>{
    console.log('Props in Home After Login:', props)
    console.log('The Token is:', props.auth.token || window.localStorage.getItem('token'))
    const getUsers = props.getUsers;
    const [users, setUsers] = useState()
    //useEffect
    useEffect(()=>{
        console.log('Inside Use Effect: Fetching Users....')
        setUsers(getUsers(props.auth.token));
        if(props.auth.token){
          window.localStorage.setItem('token', props.auth.token)
        }
       
    },[props.auth.token])
    console.log('USERS IN USERSWRAPPER.js',users);
    return(
        <div>
          <UsersWrapper />
        </div>
    )
}

const mapStateToProps = state => {
    return {
      auth: {
        isLoggedIn: state.auth.isLoggedIn,
        token: state.auth.token,
        currentUser: state.auth.currentUser,
        isFetching: state.auth.isFetching,
        error: state.auth.error,
        users: state.auth.users
      }
    }
  }
  export default connect(
    mapStateToProps,
    //place imported actions below
    { login,getUsers }
  )(Home);