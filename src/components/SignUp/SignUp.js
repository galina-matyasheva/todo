import React, {Component} from 'react'
import "./SignUp.css"
import register from './SignUp.jpg'
import api from "../../api";
import DialogAlert from "../Dialog"


class SignUp extends Component {
    state = {
        errorMessageEmail: '',
        errorMessageRepeatPassword: '',
        errorMessagePassword: '',
        errorMessageName: '',
        error: '',
        isPasswordHidden: true,
        isRepeatPasswordHidden: true,
        openDialog: false
    };

    onClickRegister = async () => {
        //'------------onClickLogin'

        if (!this.validateField('name', this.state.name) || !this.validateField('email', this.state.email) || !this.validateField('password', this.state.password) || !this.validateField('repeatPassword', this.state.repeatPassword)) {
            // console.log('invalid data');
            // console.log('name', this.validateField('name', this.state.name));
            // console.log('email', this.validateField('email', this.state.email));
            // console.log('password', this.validateField('email', this.state.password));
            // console.log('password value', this.state.password);
            // console.log('repeatPassword', this.validateField('repeatPassword', this.state.repeatPassword));


            this.setState({
                errorMessageRequiredFields: 'fields are not filled properly'
            });

            return;
        }

        if (this.state.errorMessagePassword || this.state.errorMessageEmail || this.state.errorMessageName || this.state.errorMessageRepeatPassword) {
            return;
        }

        const payload = {name: this.state.name, password: this.state.password, email: this.state.email};//передаем на сервер

        await api.registerUser(payload).then(res => {

            // `user register successfully`, res.data.id
            //window.alert('user register successfully');
            this.showDialog("user register successfully", () => {
                this.props.history.push('/login');
            });


        }, error => {
            //window.alert("registration error ");
            this.showDialog("user with such name or email already existed", undefined);
            this.setState({
                error: "registration error " + error
            });
        });

    };

    onChangeName = e => {
        //'----------onChangeName'
        if (!this.validateField('name', e.target.value)) {
            this.state.errorMessageName = 'Name must include latin letters and numbers';
        } else {
            this.state.errorMessageName = '';
        }
        this.setState({
            name: e.target.value,
            errorMessageRequiredFields: ''
        })
    };

    validateField = (type, value) => {

        switch (type) {
            case 'name':
                return /^[a-zA-Z][a-zA-Z0-9-_\.]{0,20}$/.test(value);

            case 'email':
                return /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(value);

            case 'password':
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value);

            case 'repeatPassword':
                return this.validateRepeatPassword(value);

            default:
                break;
        }
    };

    onChangeEmail = e => {
        //'----------onChangeEmail'

        if (!this.validateField('email', e.target.value)) {
            this.state.errorMessageEmail = 'Invalid email';
        } else {
            this.state.errorMessageEmail = '';
        }
        this.setState({
            email: e.target.value,
            errorMessageRequiredFields: ''
        })
    };

    onChangePassword = e => {
        //'----------onChangePassword'

        if (!this.validateField('password', e.target.value)) {
            this.state.errorMessagePassword = 'Password must include lowercase, uppercase latin letters and numbers';
        } else {
            this.state.errorMessagePassword = '';
            // this.state.errorMessageRequiredFields = '';
        }
        this.state.password = e.target.value;
        this.state.errorMessageRequiredFields = '';
        this.validateRepeatPassword(this.state.repeatPassword);

        this.setState({
            errorMessageRequiredFields: '',
        })
    };

    validateRepeatPassword = (value) => {
        if (this.state.password === value) {
            this.state.errorMessageRepeatPassword = '';
            this.state.errorMessageRequiredFields = '';
            return true;
        } else {
            this.state.errorMessageRepeatPassword = 'Passwords are not the same';
            return false;
        }
    };

    onChangeRepeatPassword = e => {
        //'----------onChangePassword'

        this.validateRepeatPassword(e.target.value);

        this.setState({
            repeatPassword: e.target.value,
            errorMessageRequiredFields: '',
        })
    };

    onClickCancel = () => {
        this.props.history.push('/login');
    };

    showDialog = (dialogText, onDialogClose) => {

        this.setState({
            openDialog: true,
            dialogText: dialogText,
            onDialogClose: onDialogClose
        })
    };

    handleCloseDialog = () => {
        if (this.state.onDialogClose) {
            this.state.onDialogClose();
        }
        this.setState({
            openDialog: false
        })
    };

    render() {

        return (
            <div>

                <div className="register-container">
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <div className="imgcontainer">
                        <img src={register} alt="Avatar" className="avatar"/>
                    </div>
                    <hr/>
                    <p className={this.state.error ? 'error-message' : 'message'}>{this.state.error}</p>
                    <p className={!this.state.errorMessageRequiredFields ? 'error-message' : 'message'}>{this.state.errorMessageRequiredFields}</p>

                    <label htmlFor="name"><b>Name</b></label>
                    <input
                        className={this.state.errorMessageName || this.state.errorMessageRequiredFields ? 'mistake-name' : 'name'}
                        type="text" placeholder="Enter Name" name="name" required
                        onChange={(e) => this.onChangeName(e)}/>
                    <p className={!this.state.errorMessageName ? 'error-message' : 'message'}>{this.state.errorMessageName}</p>

                    <label htmlFor="email"><b>Email</b></label>
                    <input
                        className={this.state.errorMessageEmail || this.state.errorMessageRequiredFields ? 'mistake-email' : 'email'}
                        type="text" placeholder="Enter Email" name="email" required
                        onChange={(e) => this.onChangeEmail(e)}/>
                    <p className={!this.state.errorMessageEmail ? 'error-message' : 'message'}>{this.state.errorMessageEmail}</p>

                    <label htmlFor="psw"><b>Password</b> </label>

                    <div className='block-password'>
                        <input
                            className={this.state.errorMessagePassword || this.state.errorMessageRequiredFields ? 'mistake-register-password' : 'register-password'}
                            type={this.state.isPasswordHidden ? 'password' : 'text'} placeholder="Enter Password"
                            name="psw"
                            required
                            onChange={(e) => this.onChangePassword(e)}
                        />
                        <p className={this.state.isPasswordHidden ? 'eye-on eye' : 'eye-off eye'}
                           onClick={() => this.setState({isPasswordHidden: !this.state.isPasswordHidden})}> </p>
                    </div>

                    {/*<p  onClick={()=>this.setState ({isPasswordHidden: !this.state.isPasswordHidden})}>Show password</p>*/}


                    <p className={!this.state.errorMessagePassword ? 'error-message' : 'message'}>{this.state.errorMessagePassword}</p>

                    <label htmlFor="psw-repeat"><b>Repeat Password</b></label>

                    <div className='block-password'>
                        <input
                            className={this.state.errorMessageRepeatPassword || this.state.errorMessageRequiredFields ? 'mistake-repeat-password' : 'register-password'}
                            type={this.state.isRepeatPasswordHidden ? 'password' : 'text'} placeholder="Repeat Password"
                            name="psw-repeat" required
                            onChange={(e) => this.onChangeRepeatPassword(e)}/>
                        <p className={this.state.isRepeatPasswordHidden ? 'eye-on eye' : 'eye-off eye'}
                           onClick={() => this.setState({isRepeatPasswordHidden: !this.state.isRepeatPasswordHidden})}> </p>
                    </div>
                    <p className={!this.state.errorMessageRepeatPassword ? 'error-message' : 'message'}>{this.state.errorMessageRepeatPassword}</p>

                    <p>By creating an account you agree to our <a href="#">Terms
                        & Privacy</a>.</p>

                    <div className="clearfix">
                        <button className="register-btn cancel-btn" onClick={() => this.onClickCancel()}>Cancel</button>
                        <button className="register-btn sign-up-btn" onClick={() => this.onClickRegister()}>Sign Up
                        </button>
                    </div>


                    <DialogAlert
                        showDialog={this.showDialog}
                        handleCloseDialog={this.handleCloseDialog}
                        isOpen={this.state.openDialog}
                        onClose={this.handleCloseDialog}
                        dialogText={this.state.dialogText}
                    />
                </div>
            </div>
        )

    }
}

export default SignUp