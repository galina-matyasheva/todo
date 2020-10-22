import React, {Component} from 'react'
import "./SignIn.css"
import registerForm from './SignIn.jpg'
import api from "../../api";
import jwt from "jsonwebtoken";


class signIn extends Component {

    state = {
        login: '',
        password: '',
        user: {},
    };

    //обработчик для кнопки ок
    onClickLogin = async () => {


        if (!this.state.login || !this.state.password) {
            this.setState({
                errorMessageRequiredFields: 'Fields are not filled'
            });

            return;
        }

        console.log('------------onClickLogin');

        const payload = {login: this.state.login, password: this.state.password};//передаем на сервер

        await api.login(payload).then(res => {
            //`user logged successfully`
            //res.data.userId, '------userId'
            //localStorage.setItem('userId', res.data.userId);
            //res.data.token, '------token'

            localStorage.setItem('token', res.data.token);// установка токена в сессию
            const decoded = jwt.decode(res.data.token, {complete: true});
            console.log(decoded, "------decoded");
            const userId = decoded.payload.userId;
            console.log(userId, "----userId");
            localStorage.setItem('userId', userId);

            this.props.history.push('/todo');

        }, error => {
            this.setState({
                error: "Invalid login or password "
            });

    },

    )};

    //передаю изменения в стейт
    onChangeLogin = e => {
        //'----------onChangeLogin'


        this.setState({
            login: e.target.value
        })
    };

    onChangePassword = e => {
        //'----------onChangePassword'

        this.setState({
            password: e.target.value
        })
    };

    onClickSignUp = () => {
       // '---------onClickSignUp'
        this.props.history.push('/register');
    };


    render() {
        return (
            <div>
                <div className="imgcontainer">
                    <img src={registerForm} alt="Avatar" className="avatar"/>
                </div>
                <p className={!this.state.error ? 'error-message' : 'message'}>{this.state.error}</p>
                <p className= 'message'>{this.state.errorMessageRequiredFields}</p>
                <p><strong>Login:</strong>
                    <input className='login' type='text' maxLength="25" size="40" name="login"
                           onChange={(e) => this.onChangeLogin(e)}/></p>

                <p><strong>Password:</strong>
                    <input className='password' type="password" maxLength="25" size="40" name="password"
                           onChange={(e) => this.onChangePassword(e)}/></p>

                <button className='ok' onClick={() => this.onClickLogin()}>OK</button>
                <button className='register' onClick={() => this.onClickSignUp()}>SIGN UP</button>
            </div>
        )
    }
}

export default signIn
