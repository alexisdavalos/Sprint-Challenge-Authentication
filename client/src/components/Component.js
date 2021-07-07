import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {login, actionName} from '../actions'

const Component = props =>{
  console.log(props)
  useEffect(()=>{
 
  },[])
    return(
        <div className='App-Redux'>
          <h3>This Quote Is Brought To You By: Redux</h3>
            <p>"{}"- Kanye West</p>
        </div>
    )
}

const mapStateToProps = state => {
    return{
      auth: {
        isLoggedIn: state.auth. isLoggedIn,
        isFetching: state.auth.isFetching,
        error: state.auth.error
      }
    }
  }
export default connect(
mapStateToProps,
//place imported actions below
{login, actionName}
)(Component);