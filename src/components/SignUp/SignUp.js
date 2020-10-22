import React, {Component} from 'react'
import "./SignUp.css"
import register from './SignUp.jpg'
import api from "../../api";


class SignUp extends Component {
    state = {
        errorMessageEmail: '',
        errorMessageRepeatPassword: '',
        errorMessagePassword: '',
        errorMessageName: '',
        error: '',
    };

    onClickRegister = async ()=> {
        //'------------onClickLogin'

        if(!this.validateField('name', this.state.name) || !this.validateField('email', this.state.email) || !this.validateField('password', this.state.password)){
            this.setState({
                         errorMessageRequiredFields: 'fields are not filled'
                    });

            return;
        }

          if (this.state.errorMessagePassword || this.state.errorMessageEmail || this.state.errorMessageName || this.state.errorMessageRepeatPassword) {
              return;
          }

        const payload = { name: this.state.name, password: this.state.password, email: this.state.email};//передаем на сервер

        await api.registerUser(payload).then(res => {

           // `user register successfully`, res.data.id
            window.alert('user register successfully');
            this.props.history.push('/login');

            }, error => {
            this.setState({
                error: "registration error "
            });
        });
        console.log(this.state.error);
    };

    onChangeName= e => {
        //'----------onChangeName'
        if (!this.validateField('name', e.target.value)) {
            this.state.errorMessageName = 'Name must include latin letters and numbers';
        } else {
            this.state.errorMessageName = '';
        }
        this.setState({
            name: e.target.value
        })
    };

    validateField = (type, value) => {

        switch (type) {
            case 'name':
                if (/^[a-zA-Z][a-zA-Z0-9-_\.]{0,20}$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'email':
                if (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(value)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case 'password':
                if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
                break;
            default:
                break;
        }
    };



    onChangeEmail= e => {
       //'----------onChangeEmail'

        if (!this.validateField('email', e.target.value)) {
            this.state.errorMessageEmail = 'Invalid email';
        } else {
            this.state.errorMessageEmail = '';
        }
        this.setState({
            email: e.target.value
        })


    };


    onChangePassword = e => {
        //'----------onChangePassword'
        if (!this.validateField('password', e.target.value)) {
            this.state.errorMessagePassword = 'Password must include lowercase, uppercase latin letters and numbers';
        } else {
            this.state.errorMessagePassword = '';
        }
        this.setState({
            password: e.target.value
        })
    };



    onChangeRepeatPassword = e => {
        //'----------onChangePassword'
       if (this.state.password === e.target.value){
       this.state.errorMessageRepeatPassword = '';
    } else {
           this.state.errorMessageRepeatPassword = 'Passwords are not the same';
       }
        this.setState({
            repeatPassword: e.target.value
        })
    };

    onClickCancel = () => {
        this.props.history.push('/login');
    };

    render() {


        return (
            <div>
                    <div className="register-container">
                        <h1>Sign Up</h1>
                        <p>Please fill in this form to create an account.</p>
                        <div className="imgcontainer">
                            <img src={register} alt="Avatar" className="avatar" />
                        </div>
                        <hr/>
                        <p className={this.state.error ? 'error-message' : 'message'}>{this.state.error}</p>
                        <p className={!this.state.errorMessageRequiredFields ?'error-message' : 'message'}>{this.state.errorMessageRequiredFields}</p>

                        <label htmlFor="name"><b>Name</b></label>
                        <input className={this.state.errorMessageName  ? 'mistake-name' : 'name'} type="text" placeholder="Enter Name" name="name" required onChange={(e)=>this.onChangeName(e)}/>
                        <p className={!this.state.errorMessageName  ? 'error-message' : 'message'}>{this.state.errorMessageName}</p>

                            <label htmlFor="email"><b>Email</b></label>
                            <input className={this.state.errorMessageEmail  ? 'mistake-email' : 'email'} type="text" placeholder="Enter Email" name="email" required onChange={(e)=>this.onChangeEmail(e)}/>
                            <p className={!this.state.errorMessageEmail ? 'error-message' : 'message'}>{this.state.errorMessageEmail}</p>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input className={this.state.errorMessagePassword ? 'mistake-register-password' : 'register-password'} type="password" placeholder="Enter Password" name="psw" required onChange={(e)=>this.onChangePassword(e)}/>
                        <p className={!this.state.errorMessagePassword ? 'error-message' : 'message'}>{this.state.errorMessagePassword}</p>

                            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                            <input className= {this.state.errorMessageRepeatPassword ?  'mistake-repeat-password' : 'register-password'} type="password" placeholder="Repeat Password" name="psw-repeat" required  onChange={(e)=>this.onChangeRepeatPassword(e)}/>
                            <p className={!this.state.errorMessageRepeatPassword ? 'error-message' : 'message'}>{this.state.errorMessageRepeatPassword}</p>

                            <p>By creating an account you agree to our <a href="#">Terms
                                & Privacy</a>.</p>

                            <div className="clearfix">
                                <button className="register-btn cancel-btn" onClick={()=> this.onClickCancel()}>Cancel</button>
                                <button className="register-btn sign-up-btn" onClick={()=> this.onClickRegister()}>Sign Up</button>
                            </div>
                        </div>
            </div>
        )

    }
}



export default SignUp