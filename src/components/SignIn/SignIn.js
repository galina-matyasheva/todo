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
        isPasswordHidden: true
    };

    //обработчик для кнопки ок
    onClickLogin = async () => {


        if (!this.state.login || !this.state.password) {
            this.setState({
                errorMessageRequiredFields: 'Fields are not filled'
            });

            return;
        }

        // '------------onClickLogin';

        const payload = {login: this.state.login, password: this.state.password};//передаем на сервер

        await api.login(payload).then(res => {
                //`user logged successfully`
                //res.data.userId, '------userId'
                //localStorage.setItem('userId', res.data.userId);
                //res.data.token, '------token'

                localStorage.setItem('token', res.data.token);// установка токена в сессию
                const decoded = jwt.decode(res.data.token, {complete: true});
                //decoded, "------decoded"
                const userId = decoded.payload.userId;
                // userId, "----userId"
                localStorage.setItem('userId', userId);

                this.props.history.push('/todo');

            }, error => {
                this.setState({
                    error: "Invalid login or password "
                });
            },
        )
    };

    //передаю изменения в стейт
    onChangeLogin = e => {
        //'----------onChangeLogin'


        this.setState({
            login: e.target.value,
            errorMessageRequiredFields: '',
            error: ''
        })
    };

    onChangePassword = e => {
        //'----------onChangePassword'

        this.setState({
            password: e.target.value,
            errorMessageRequiredFields: '',
            error: ''
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
                <p className='message'>{this.state.errorMessageRequiredFields}</p>
                <p><strong>Login:</strong>
                    <input className={this.state.errorMessageRequiredFields ? 'mistake-login' : 'login'} type='text'
                           maxLength="25" size="40" name="login"
                           onChange={(e) => this.onChangeLogin(e)}/></p>

                <p><strong>Password:</strong>
                    <div className='block-password-sign-in'>
                    <input className={this.state.errorMessageRequiredFields ? 'mistake-password' : 'password'}
                           type={this.state.isPasswordHidden ? 'password' : 'text'} maxLength="25" size="40" name="password"
                           onChange={(e) => this.onChangePassword(e)}/>
                    <p className={this.state.isPasswordHidden ? 'eye-on eye' : 'eye-off eye'}
                       onClick={() => this.setState({isPasswordHidden: !this.state.isPasswordHidden})}>    </p>
                    </div>
                </p>


                <button className='ok' onClick={() => this.onClickLogin()}>OK</button>
                <button className='register' onClick={() => this.onClickSignUp()}>SIGN UP</button>
            </div>
        )
    }
}

export default signIn
