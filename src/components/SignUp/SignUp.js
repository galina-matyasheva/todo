import React, {useState, UseState} from 'react'
import "./SignUp.css"
import register from './SignUp.jpg'
import api from "../../api";
import DialogAlert from "../Dialog"

export const SignUp = ({history}) => {
    const [errorsText, setErrorsText] = useState({
        errorMessageRequiredFields: '',
        backendError: '',
        errorMessageEmail: '',
        errorMessageRepeatPassword: '',
        errorMessagePassword: '',
        errorMessageName: ''
    });
    const [isPasswordHidden, setPasswordHidden] = useState(true);
    const [isRepeatPasswordHidden, setRepeatPasswordHidden] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [dialogText, setDialogText] = useState('');


    const onClickRegister = async () => {
        if (!validateField('name', name) || !validateField('email', email) || !validateField('password', password) || !validateField('repeatPassword', repeatPassword)) {
            setErrorsText({
                ...errorsText,
                errorMessageRequiredFields: 'fields are not filled properly'
            });
            return;
        }

        if (errorsText.errorMessagePassword || errorsText.errorMessageEmail || errorsText.errorMessageName || errorsText.errorMessageRepeatPassword) {
            return;
        }
        const payload = {name: name, password: password, email: email};//передаем на сервер

        await api.registerUser(payload).then(res => {
            showDialog("user register successfully", true);
        }, error => {
            showDialog("user with such name or email already existed", false);
            setErrorsText({
                ...errorsText,
                backendError: "registration error "
            });
        });

    };

    const onChangeName = e => {
        if (!validateField('name', e.target.value)) {
            errorsText.errorMessageName = 'Name must include latin letters and numbers';
        } else {
            errorsText.errorMessageName = '';
        }
        setErrorsText({
            ...errorsText,
            errorMessageRequiredFields: ''
        });

        setName(
            e.target.value
        )
    };

    const validateField = (type, value) => {


        switch (type) {
            case 'name':
                return /^[a-zA-Z][a-zA-Z0-9-_\.]{0,20}$/.test(value);

            case 'email':
                return /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(value);

            case 'password':
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value);

            case 'repeatPassword':
                return validateRepeatPassword(value);

            default:
                break;
        }
    };

    const onChangeEmail = e => {
        if (!validateField('email', e.target.value)) {
            errorsText.errorMessageEmail = 'Invalid email';
        } else {
            errorsText.errorMessageEmail = '';
        }
        setErrorsText({
            ...errorsText,
            errorMessageRequiredFields: ''
        });

        setEmail(
            e.target.value
        )
    };

    const onChangePassword = e => {
        if (!validateField('password', e.target.value)) {
            errorsText.errorMessagePassword = 'Password must include lowercase, uppercase latin letters and numbers';
        } else {
            errorsText.errorMessagePassword = '';
        }
        errorsText.errorMessageRequiredFields = '';
        validateRepeatPassword(repeatPassword);

        setErrorsText({
            ...errorsText,
            errorMessageRequiredFields: '',
        });

        setPassword(
            e.target.value
        )
    };

    const validateRepeatPassword = (value) => {
        if (password === value) {
            errorsText.errorMessageRepeatPassword = '';
            errorsText.errorMessageRequiredFields = '';
            return true;
        } else {
            errorsText.errorMessageRepeatPassword = 'Passwords are not the same';
            return false;
        }
    };

    const onChangeRepeatPassword = e => {
        validateRepeatPassword(e.target.value);

        setErrorsText({
            ...errorsText,
            errorMessageRequiredFields: '',
        });
        setRepeatPassword(
            e.target.value
        )
    };

    const onClickCancel = () => {
        history.push('/login');
    };

    const showDialog = (dialogText, success) => {
        setOpenDialog(
            true,
        );
        setDialogText(dialogText);
        setIsSuccess(success)
    };

    const handleCloseDialog = () => {
        if (isSuccess) {
            history.push('/login')
        }
        setOpenDialog(
            false
        )
    };

    return (
        <div>

            <div className="register-container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <div className="imgcontainer">
                    <img src={register} alt="Avatar" className="avatar"/>
                </div>
                <hr/>
                <p className={errorsText.backendError ? 'error-message' : 'message'}>{errorsText.backendError}</p>
                <p className={!errorsText.errorMessageRequiredFields ? 'error-message' : 'message'}>{errorsText.errorMessageRequiredFields}</p>

                <label htmlFor="name"><b>Name</b></label>
                <input
                    className={errorsText.errorMessageName || errorsText.errorMessageRequiredFields ? 'mistake-name' : 'name'}
                    type="text" placeholder="Enter Name" name="name" required
                    onChange={(e) => onChangeName(e)}/>
                <p className={!errorsText.errorMessageName ? 'error-message' : 'message'}>{errorsText.errorMessageName}</p>

                <label htmlFor="email"><b>Email</b></label>
                <input
                    className={errorsText.errorMessageEmail || errorsText.errorMessageRequiredFields ? 'mistake-email' : 'email'}
                    type="text" placeholder="Enter Email" name="email" required
                    onChange={(e) => onChangeEmail(e)}/>
                <p className={!errorsText.errorMessageEmail ? 'error-message' : 'message'}>{errorsText.errorMessageEmail}</p>

                <label htmlFor="psw"><b>Password</b> </label>

                <div className='block-password'>
                    <input
                        className={errorsText.errorMessagePassword || errorsText.errorMessageRequiredFields ? 'mistake-register-password' : 'register-password'}
                        type={isPasswordHidden ? 'password' : 'text'} placeholder="Enter Password"
                        name="psw"
                        required
                        onChange={(e) => onChangePassword(e)}
                    />
                    <p className={isPasswordHidden ? 'eye-on eye' : 'eye-off eye'}
                       onClick={() => setPasswordHidden(!isPasswordHidden)}> </p>
                </div>

                <p className={!errorsText.errorMessagePassword ? 'error-message' : 'message'}>{errorsText.errorMessagePassword}</p>

                <label htmlFor="psw-repeat"><b>Repeat Password</b></label>

                <div className='block-password'>
                    <input
                        className={errorsText.errorMessageRepeatPassword || errorsText.errorMessageRequiredFields ? 'mistake-repeat-password' : 'register-password'}
                        type={isRepeatPasswordHidden ? 'password' : 'text'} placeholder="Repeat Password"
                        name="psw-repeat" required
                        onChange={(e) => onChangeRepeatPassword(e)}/>
                    <p className={isRepeatPasswordHidden ? 'eye-on eye' : 'eye-off eye'}
                       onClick={() => setRepeatPasswordHidden(!isRepeatPasswordHidden)}> </p>
                </div>
                <p className={!errorsText.errorMessageRepeatPassword ? 'error-message' : 'message'}>{errorsText.errorMessageRepeatPassword}</p>

                <p>By creating an account you agree to our <a href="#">Terms
                    & Privacy</a>.</p>

                <div className="clearfix">
                    <button className="register-btn cancel-btn btn-all" onClick={() => onClickCancel()}>Cancel</button>
                    <button className="register-btn sign-up-btn btn-all" onClick={() => onClickRegister()}>Sign Up
                    </button>
                </div>

                <DialogAlert
                    handleCloseDialog={handleCloseDialog}
                    isOpen={openDialog}
                    onClose={handleCloseDialog}
                    dialogText={dialogText}
                />
            </div>
        </div>
    )
};

export default SignUp

