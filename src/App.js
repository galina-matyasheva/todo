import React, {Component} from 'react'
import Todo from './components/Todo'
import {Switch, Route} from 'react-router-dom'
import loginRegister from './loginRegister'
import SignUp from "./SignUp";


class App extends Component {




    render() {

        return(

                <Switch>
                    <Route path='/todo'>
                        <Todo/>
                    </Route>
                <Route path='/login' component={loginRegister}/>
                <Route path='/register' component={SignUp}/>

                </Switch>

        )
    }
}

export default App