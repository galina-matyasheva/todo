import React, {Component} from 'react'
import "./loginRegister.css"
import registerForm from './register-form.jpg'
import api from "./api";



class loginRegister extends Component {

    state = {
       login: '',
        password: '',
        user: {}

    };


    //обработчик для кнопки ок
    onClickLogin = async ()=> {

        console.log('------------onClickLogin');

        const payload = { login: this.state.login, password: this.state.password};//передаем на сервер

        await api.login(payload).then(res => {
            console.log(`user logged successfully`);
            console.log(res.data.userId, '------userId');
            localStorage.setItem('userId', res.data.userId);
            console.log(res.data.token, '------token');

            sessionStorage.setItem('token',res.data.token);// установка токена в сессию

          this.props.history.push('/todo');

            // this.setState({
            //
            // });
        }, error => window.alert("error" + error));
        // this.filter();
    };

    //передаю изменения в стейт
    onChangeLogin = e => {
         console.log('----------onChangeLogin')
        this.setState({
            login: e.target.value
        })
    };

    onChangePassword = e => {
        console.log('----------onChangePassword')
        this.setState({
            password: e.target.value
        })
    };

    onClickSignUp = () => {
        console.log('---------onClickSignUp')
        this.props.history.push('/register');
    };



    render() {
        return(
            <div>
                {/*<form className='register-form'>*/}
                    <div className="imgcontainer">
                        <img src={registerForm} alt="Avatar" className="avatar" />
                    </div>
                    <p><strong>Login:</strong>
                        <input className='login' type='text' maxLength="25" size="40" name="login" onChange={(e)=>this.onChangeLogin(e)}/></p>
                    <p><strong>Password:</strong>
                        <input className='password' type="password" maxLength="25" size="40" name="password" onChange={(e)=>this.onChangePassword(e)}/></p>
                    <button className='ok'  onClick={()=>this.onClickLogin()}>OK</button>
                    <button className='register' onClick={()=>this.onClickSignUp()}>SIGN UP</button>
                {/*</form>*/}
            </div>
        )
    }
}

export default loginRegister
