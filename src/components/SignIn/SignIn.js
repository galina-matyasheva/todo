import React, {useState} from 'react'
import "./SignIn.css"
import registerForm from './SignIn.jpg'
import api from "../../api";
import jwt from "jsonwebtoken";

export const SignIn = ({history}) => {

    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [isPasswordHidden,setPasswordHidden] = useState(true);
    const [errorsText, setErrorsText] = useState({errorMessageRequiredFields: '', backendError: ''});

    //обработчик для кнопки ок
    const onClickLogin = async () => {
        if (!login || !password) {

                setErrorsText({
                   ...errorsText,//переменная для возврата предыдущего значения
                    errorMessageRequiredFields: 'Fields are not filled'
                });
            return;
        }

        const payload = {login: login, password: password};//передаем на сервер

        await api.login(payload).then(res => {
                localStorage.setItem('token', res.data.token);// установка токена в сессию
                const decoded = jwt.decode(res.data.token, {complete: true});
                const userId = decoded.payload.userId;
                localStorage.setItem('userId', userId);
                history.push('/todo');
            }, error => {

            setErrorsText({
                ...errorsText,//переменная для возврата предыдущего значения
                backendError: "Invalid login or password "
            });
            },
        )
    };

    //передаю изменения в стейт
    const onChangeLogin = e => {

        setErrorsText({
            ...errorsText,//переменная для возврата предыдущего значения
            errorMessageRequiredFields: '',
            backendError: "",

        });

        setLogin(
            e.target.value
        )
    };

    const onChangePassword = e => {

        setErrorsText({
            ...errorsText,//переменная для возврата предыдущего значения
            errorMessageRequiredFields: '',
            backendError: "",

        });

        setPassword(
            e.target.value
        )
    };

    const onClickSignUp = () => {
        history.push('/register');

    setPasswordHidden (
        !isPasswordHidden
    )};


    return (
        <div className='SignIn'>
            <div className="imgcontainer">
                <img src={registerForm} alt="Avatar" className="avatar"/>
            </div>
            <p className={!errorsText.backendError ? 'error-message' : 'message'}>{errorsText.backendError}</p>
            <p className='message'>{errorsText.errorMessageRequiredFields}</p>
            <div><strong>Login:</strong>
                <input className={errorsText.errorMessageRequiredFields ? 'mistake-login' : 'login'} type='text'
                       maxLength="25" size="40" name="login"
                       onChange={(e) => onChangeLogin(e)}/></div>

            <div><strong>Password:</strong>
                <div className='block-password-sign-in'>
                    <input className={errorsText.errorMessageRequiredFields ? 'mistake-password' : 'password'}
                           type={isPasswordHidden ? 'password' : 'text'} maxLength="25" size="40"
                           name="password"
                           onChange={(e) => onChangePassword(e)}/>
                    <p className={isPasswordHidden ? 'eye-on eye' : 'eye-off eye'}
                       onClick={() => setPasswordHidden(!isPasswordHidden)}> </p>
                </div>
            </div>
            <button className='ok' onClick={onClickLogin}>OK</button>
            <button className='register' onClick={onClickSignUp}>SIGN UP</button>
        </div>
    )
};

export default SignIn


