import React from 'react'
import Todo from './components/TodoList/Todo'
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom'
import signIn from './components/SignIn/SignIn'
import SignUp from "./components/SignUp/SignUp";

export const App = () => {

    const checkAuth = () =>{
        const token = sessionStorage.getItem('token');
        return !!token
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/todo' component={Todo}/>
                <Route path='/login' component={signIn}/>
                <Route path='/register' component={SignUp}/>
                <Route path="/" render={props => (
                    checkAuth() ? (
                        <Redirect to={{pathname: '/todo'}}/>
                    ) : (
                        <Redirect to={{pathname: '/login'}}/>
                    )
                )}/>
            </Switch>
        </BrowserRouter>
    )
};

export default App
