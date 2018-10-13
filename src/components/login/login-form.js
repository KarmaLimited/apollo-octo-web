import React, { Component } from 'react'
import { AUTH_TOKEN } from '../utils/constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter} from 'react-router-dom';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  }

  render() {
    const { login, email, password, name } = this.state
    return (
      <div className="login-box">
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              className="form-input"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Enter your name"
            />
          )}
          <input
            value={email}
            className="form-input"
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Email address"
          />
          <input
            value={password}
            className="form-input"
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div className="pointer mr2 form-button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>
          <div
            className="pointer form-button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? 'Create an account?' : 'Already have an account?'}
          </div>
        </div>
      </div>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push('/new')
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default withRouter(Login)