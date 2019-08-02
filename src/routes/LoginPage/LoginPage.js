import React from 'react';
import { Section } from '../../components/Utils/Utils';

export default class LoginPage extends React.Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/home';
        history.push(destination);
    }

    render() {
        return (
            <Section className='LoginPage'>
                <h1>Login</h1>
                <LoginForm
                    onLoginSuccss={this.handleLoginSuccess}
                />
            </Section>
        )
    }
}