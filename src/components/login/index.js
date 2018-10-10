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
                        <p>
                        <Loginform/>
                        </p>
                    </article>
                    <aside className="aside aside-1">
                        <p>
                            <a href="#" rel="noopener"><FaGoogle/><br/>google</a>
                        </p>
                        <p>
                            <a href="#" rel="noopener"><FaLinkedin/><br/>in</a>
                        </p>
                    </aside>
                    <aside className="aside aside-2">
                        <p><a href="#" rel="noopener"><FaGithub/><br/>github</a></p>
                        <p><a href="#" rel="noopener"><FaFacebook/><br/>facebook</a></p>
                    </aside>
                    <footer className="footer">
                      
                    </footer>
                </div>
            </div>
        )
    }

}

export default LoginPage;