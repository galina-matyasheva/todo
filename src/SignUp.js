import React, {Component} from 'react'
import "./SignUp.css"
import register from './register.jpg'


class SignUp extends Component {
    render() {


        return (
            <div>
                <form>
                    <div className="register-container">
                        <h1>Sign Up</h1>
                        <p>Please fill in this form to create an account.</p>
                        <div className="imgcontainer">
                            <img src={register} alt="Avatar" className="avatar" />
                        </div>
                        <hr/>

                            <label htmlFor="email"><b>Email</b></label>
                            <input className='email' type="text" placeholder="Enter Email" name="email" required/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input className='register-password' type="password" placeholder="Enter Password" name="psw" required/>

                            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                            <input className='register-password' type="password" placeholder="Repeat Password" name="psw-repeat" required/>

                            <label htmlFor='remember'>
                        <input className='register-remember' type="checkbox"  name="remember"/> Remember me
                            </label>

                            <p>By creating an account you agree to our <a href="#">Terms
                                & Privacy</a>.</p>

                            <div className="clearfix">
                                <button className="register-btn cancel-btn">Cancel</button>
                                <button className="register-btn sign-up-btn">Sign Up</button>
                            </div>
                        </div>
                </form>
            </div>
        )

    }
}



export default SignUp