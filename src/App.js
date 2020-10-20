import React, {Component} from 'react'
import Todo from './components/Todo'
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'
import signIn from './components/SignIn'
import SignUp from "./components/SignUp";


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
                    <Route path='/todo' component={Todo}/>
                    <Route path='/login' component={signIn}/>
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