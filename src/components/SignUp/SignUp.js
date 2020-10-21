import React, {Component} from 'react'
import "./SignUp.css"
import register from './SignUp.jpg'
import api from "../../api";


class SignUp extends Component {
    state = {
        errorMessageEmail: '',
        errorMessagePassword: ''
    };

    onClickRegister = async ()=> {
        //'------------onClickLogin'
        const payload = { name: this.state.name, password: this.state.password, email: this.state.email};//передаем на сервер

        await api.registerUser(payload).then(res => {
           // `user register successfully`, res.data.id
            window.alert('user register successfully');
            this.props.history.push('/login');

        }, error => window.alert("error" + error));

    };

    onChangeName= e => {
        //'----------onChangeName'
        this.setState({
            name: e.target.value
        })
    };

    onChangeEmail= e => {
       //'----------onChangeEmail'

        const validateResalt = this.validateEmail(e.target.value);
        console.log(validateResalt, e.target.value);
        if (!this.validateEmail(e.target.value)) {
            this.state.errorMessageEmail = 'invalid email';
        } else {
            this.state.errorMessageEmail = '';
        }
        this.setState({
            email: e.target.value
        })


    };

    validateEmail = (email) => {
        if (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(email)){
            return true;
        } else {
            return false;
        }
    };

    onChangePassword = e => {
        //'----------onChangePassword'
        this.setState({
            password: e.target.value
        })
    };

    onChangeRepeatPassword = e => {
        //'----------onChangePassword'
       if (this.state.password === e.target.value){
       this.state.errorMessagePassword = '';
    } else {
           this.state.errorMessagePassword = 'passwords are not the same';
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
                        <label htmlFor="name"><b>Name</b></label>
                        <input className='name' type="text" placeholder="Enter Name" name="name" required onChange={(e)=>this.onChangeName(e)}/>

                            <label htmlFor="email"><b>Email</b></label>
                            <input className={this.state.errorMessageEmail === ''? 'email' : 'mistake-email'} type="text" placeholder="Enter Email" name="email" required onChange={(e)=>this.onChangeEmail(e)}/>
                            <p className={this.state.errorMessageEmail === ''? 'error-message' : 'message'}>{this.state.errorMessageEmail}</p>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input className='register-password' type="password" placeholder="Enter Password" name="psw" required onChange={(e)=>this.onChangePassword(e)}/>

                            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                            <input className= {this.state.errorMessagePassword === ''? 'register-password' : 'mistake-repeat-password'} type="password" placeholder="Repeat Password" name="psw-repeat" required  onChange={(e)=>this.onChangeRepeatPassword(e)}/>
                            <p className={this.state.errorMessagePassword === ''? 'error-message' : 'message'}>{this.state.errorMessagePassword}</p>

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