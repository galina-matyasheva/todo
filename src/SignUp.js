import React, {Component} from 'react'
import "./SignUp.css"
import register from './register.jpg'
import api from "./api";


class SignUp extends Component {
    onClickRegister = async ()=> {
        console.log('------------onClickLogin');
        const payload = { name: this.state.name, password: this.state.password, email: this.state.email};//передаем на сервер

        await api.registerUser(payload).then(res => {
            console.log(`user register successfully`);
            window.alert(res.data.user.name);
            // this.setState({
            //
            // });
        }, error => window.alert("error" + error));
        // this.filter();
    };

    onChangeName= e => {
        console.log('----------onChangeName')
        this.setState({
            name: e.target.value
        })
    };

    onChangeEmail= e => {
        console.log('----------onChangeEmail')
        this.setState({
            email: e.target.value
        })
    };

    onChangePassword = e => {
        console.log('----------onChangePassword')
        this.setState({
            password: e.target.value
        })
    };

    render() {


        return (
            <div>
                {/*<form>*/}
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
                            <input className='email' type="text" placeholder="Enter Email" name="email" required onChange={(e)=>this.onChangeEmail(e)}/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input className='register-password' type="password" placeholder="Enter Password" name="psw" required onChange={(e)=>this.onChangePassword(e)}/>

                            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                            <input className='register-password' type="password" placeholder="Repeat Password" name="psw-repeat" required/>

                            <label htmlFor='remember'>
                        <input className='register-remember' type="checkbox"  name="remember"/> Remember me
                            </label>

                            <p>By creating an account you agree to our <a href="#">Terms
                                & Privacy</a>.</p>

                            <div className="clearfix">
                                <button className="register-btn cancel-btn">Cancel</button>
                                <button className="register-btn sign-up-btn" onClick={()=> this.onClickRegister()}>Sign Up</button>
                            </div>
                        </div>
                {/*</form>*/}
            </div>
        )

    }
}



export default SignUp