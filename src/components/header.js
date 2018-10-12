import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from './constants'

class Header extends React.Component {

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            <header className="header">
                <div>Stefan stuff</div>
                <span>
                    <Link to="/new" className="links">
                        News
                    </Link>
                    {authToken && (
                        <span>
                            <span> | </span>
                            <Link to="/create" className="links">Submit</Link>
                        </span>
                    )
                    }
                     <span> | </span>
                    <span>
                        {authToken ? (
                            <span onClick={() => {
                                localStorage.removeItem(AUTH_TOKEN)
                                this.props.history.push('/new')
                            }}>
                                Logout
                    </span>
                        ) : (
                                <Link to="/" className="links">Login</Link>
                            )
                        }
                    </span>
                </span>
            </header>
        )
    }
}
export default withRouter(Header);