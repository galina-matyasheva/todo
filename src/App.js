import React, {Component} from 'react'
import Todo from './components/Todo'
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'
import loginRegister from './loginRegister'
import SignUp from "./SignUp";


class App extends Component {

    checkAuth = () =>{
        console.log("checkAuth");
        const token = sessionStorage.getItem('token');
        console.log('token', token);
        return !!token
    };

    render() {

        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/todo'>
                        <Todo/>
                    </Route>
                    <Route path='/login' component={loginRegister}/>
                    <Route path='/register' component={SignUp}/>
                    <Route path="/"  render={props => (
                        this.checkAuth() ? (
                            <Redirect to={{ pathname: '/todo'}} />
                        ) : (
                            <Redirect to={{ pathname: '/login'}} />
                        )
                    )}/>
                </Switch>
            </BrowserRouter>

        )
    }
}


export default App;