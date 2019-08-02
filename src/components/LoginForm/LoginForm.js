import React from 'react';
import TokenService from '../../services/token-service';
import { Button, Input } from '../Utils/Utils'

export default class LoginForm extends React.Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = {
        error: null
    }

    handleSubmitBasicAuth = ev => {
        ev.preventdefault()
        const {user_name, password } = ev.target

        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(user_name.value, password.value)
        )

        user_name.value = '';
        password.value = '';
        this.props.onLoginSuccess()
    }

    render() {
        const { error } = this.state;
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmitBasicAuth}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='user_name'>
                    <label htmlFor='LoginForm_user_name'>
                        Username
                    </label>
                    <Input required
                        name='user_name'
                        id='LoginForm_user_name'/>
                </div>
                <div className='password'>
                    <label htmlFor='LoginForm_password'>
                        Username
                    </label>
                    <Input required
                        name='password'
                        id='LoginForm_password'/>
                </div>
                <Button type='submit'>
                    Login
                </Button>
            </form>
        )
    }
}