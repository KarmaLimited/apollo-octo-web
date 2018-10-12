import React, { Component } from 'react'
import { FaGoogle, FaGithub, FaFacebook, FaLinkedin } from 'react-icons/fa' // google linkedin github facebook
import Loginform from './login-form';
import './login.css';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <div className="wrapper">
                    <article className="main">
                        <div className="loginOptions">
                            <Loginform />
                        </div>
                    </article>
                    <aside className="aside aside-1">
                        <div className="loginOptions">
                            <a href="http://localhost:3000/" rel="noopener"><FaGoogle /><br />google</a>
                        </div>
                        <div className="loginOptions">
                            <a href="http://localhost:3000/" rel="noopener"><FaLinkedin /><br />in</a>
                        </div>
                    </aside>
                    <aside className="aside aside-2">
                        <div className="loginOptions"><a href="http://localhost:3000/" rel="noopener"><FaGithub /><br />github</a></div>
                        <div className="loginOptions"><a href="http://localhost:3000/" rel="noopener"><FaFacebook /><br />facebook</a></div>
                    </aside>

                </div>
            </div>
        )
    }

}

export default LoginPage;