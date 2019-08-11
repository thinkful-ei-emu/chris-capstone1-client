import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import { Button, Input, Required } from '../Utils/Utils';

export default class RegistrationForm extends React.Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
    }

    state = {
        error: null
    }

    handleSubmit = ev => {
        ev.preventDefault();
        const {full_name, user_name, email, password } = ev.target;

        this.setState({ error: null })
        AuthApiService.postUser({
            full_name: full_name.value,
            user_name: user_name.value,
            email: email.value,
            password: password.value
        })
        .then(user => {
            full_name.value = '';
            user_name.value = '';
            email.value = '';
            password.value = '';
            this.props.onRegistrationSuccess();
        })
        .catch(res => this.setState({ error: res.error }))
    }

    render() {
        const { error } = this.state;
        return (
            <form
                className='RegistrationForm'
                onSubmit={this.handleSubmit}
            >
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <div className='full_name'>
                    <label htmlFor='RegistrationForm_full_name'>
                        Full Name: <Required />
                    </label>
                    <Input name='full_name'
                    type='text' required
                    id='RegistrationForm_full_name'/>
                </div>
                <div className='user_name'>
                    <label htmlFor='RegistrationForm_user_name'>
                        Username: <Required />
                    </label>
                    <Input name='user_name'
                    type='text' required
                    id='RegistrationForm_user_name'/>
                </div>
                <div className='password'>
                    <label htmlFor='RegistrationForm_password'>
                        Password: <Required />
                    </label>
                    <Input name='password'
                    type='text' required
                    id='RegistrationForm_password'/>
                </div>
                <div className='email'>
                    <label htmlFor='RegistrationForm_email'>
                        E-mail: <Required />
                    </label>
                    <Input name='email'
                    type='email' required
                    id='RegistrationForm_email'/>
                </div>
                <Button type='submit'>
                    Register
                </Button>
            </form>
        )
    }
}