import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import {
	Link
} from 'react-router-dom';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card';
import * as Colors from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';



class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			password: '',
			passwordErrorText: 'Senha é um campo obrigatório',
			username: '',
			usernameErrorText: 'Usuário é um campo obrigatório',
			loginDisabled: true
		}
	}

	onLoginClicked() {
		const {
			handleLogin
		} = this.props
		const username = this.state.username
		const password = this.state.password
		handleLogin(username, password)
	}

	onPasswordChanged(e) {
		const password = e.target.value;
		const passwordErrorText = password.length > 0 ? null : 'Senha é um campo obrigatório'
		const loginDisabled = passwordErrorText != null || this.state.usernameErrorText != null
		this.setState({
			password: e.target.value,
			passwordErrorText: passwordErrorText,
			loginDisabled: loginDisabled
		})
	}

	onUsernameChanged(e) {
		const username = e.target.value
		const usernameErrorText = username.length > 0 ? null : 'Usuário é obrigatório'
		const loginDisabled = usernameErrorText != null || this.state.passwordErrorText != null
		this.setState({
			username: username,
			usernameErrorText: usernameErrorText,
			loginDisabled: loginDisabled
		})
	}

	render() {
		return (
			<Card className="content-container">
				<CardHeader title="Login" titleColor={Colors.teal400} 
					 			 titleStyle={{'fontWeight': 'bolder'}}
					 			 subtitle="Após efetuar o login, você receberá um token válido por 1 minuto. Após esse tempo, deverá iniciar nova sessão!">
				</CardHeader>
				<CardText >
					<TextField floatingLabelText="Usuário"  fullWidth={true} value={this.state.username} onChange={this.onUsernameChanged.bind(this)} errorText={this.state.usernameErrorText} />
	    			<TextField floatingLabelText="Senha" type="password" fullWidth={true}  value={this.state.password} onChange={this.onPasswordChanged.bind(this)} errorText={this.state.passwordErrorText} />
	    			<p></p>
	    			<RaisedButton label="Login" primary={true} fullWidth={true} onClick={this.onLoginClicked.bind(this)} disabled={this.state.loginDisabled} />
	    			<br/>
	    			<br/>
				  </CardText>
			</Card>
		)
	}
}

Login.propTypes = {
	handleLogin: PropTypes.func
}

export default Login