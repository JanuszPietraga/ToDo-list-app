import React, {Component} from 'react';




class SignUpForm extends Component {

    state = {
        email: '',
        password: '',
        error: null
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = event => {
        const { email, password, ...other } = this.state;
        event.preventDefault();

        this.props.signUp(
            email,
            password,
            other
        ).then(
            user => this.props.history.push('/')
        ).catch(
            error => this.setState({ error })
        )
    };

    render() {
        return (
            <div >
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div>

                        <input
                               onChange={this.handleChange}
                               name="email"
                               placeholder="e-mail"
                        />
                    </div>
                    <div>

                        <input
                               onChange={this.handleChange}
                               name="password"
                               type="password"
                               placeholder="hasło"
                        />
                    </div>
                    <button >rejestruję</button>

                </form>

            </div>
        )
    }
}

export default SignUpForm
