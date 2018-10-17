import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from './utils/constants'

class Header extends React.Component {

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            <header className="header">
                <div>
                    <Link to="/new" className="links">
                        News
                    </Link>
                    <span> | </span>
                    <Link to="/top" className="links">
                        Top
                    </Link>
                    <span> | </span>
                    {authToken && (
                        <span>
                            <Link to="/search" className="links">
                                Search
                    </Link>
                            <span> | </span>

                            <span>
                                <Link to="/create" className="links">Submit</Link>
                            </span>
                        </span>
                    )
                    }
                    <span> | </span>
                    <span className="">
                        {authToken ? (
                            <span className="pointer" onClick={() => {
                                localStorage.removeItem(AUTH_TOKEN)
                                this.props.history.push('/new')
                            }}>
                                <span className="logout">Logout</span>
                            </span>
                        ) : (
                                <Link to="/" className="links login">Login</Link>
                            )
                        }
                    </span>
                </div>
            </header>
        )
    }
}
export default withRouter(Header);