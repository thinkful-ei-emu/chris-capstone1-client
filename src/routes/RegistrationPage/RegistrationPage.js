import React from 'react';
import {Section} from '../../components/Utils/Utils';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './RegistrationPage.css';

export default class RegistrationPage extends React.Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    handleRegistrationSuccess = user => {
        const { history } = this.props;
        history.push('/login');
    }

    render() {
        return (
            <Section className='RegistrationPage'>
                <h1>Register</h1>
                <RegistrationForm
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                />
            </Section>
        )
    }
}