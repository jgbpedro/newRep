import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import {
	Link
} from 'react-router'
//components
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import * as Colors from 'material-ui/styles/colors'

class Profile extends Component {
	constructor(props) {
		super(props)
		const {
			displayName,
			role,
			uid,
			username
		} = this.props
		this.state = {
			displayName: displayName,
			role: role,
			uid: uid,
			username: username
		}
	}


	onLogoutClicked() {
		const {
			handleLogout
		} = this.props
		handleLogout()
	}

	
	render() {

		return (
			<Card className='content-container'>
				<CardHeader title={`Bem-vindo, ${this.state.displayName}`} titleColor={Colors.teal400} titleStyle={{'fontWeight': 'bolder'}} ></CardHeader>
					<CardText>
						<TextField name="Nome" floatingLabelText="Nome" fullWidth={true} value={this.state.displayName} disabled={true} />
						<p></p>
						<TextField name="Usuario" floatingLabelText="Usuario" fullWidth={true} value={this.state.username} disabled={true} />
						<p></p>
						<TextField name="uid" floatingLabelText="UID" fullWidth={true} disabled={true} value={this.state.uid} ></TextField>
						<hr/>
					</CardText>
				 	<CardActions>
						 <RaisedButton type="button" label="Logout" primary={true} onClick={this.onLogoutClicked.bind(this)} />
    				</CardActions>
			</Card>
		)
	}
}

export default Profile

Profile.propTypes = {
	displayName: PropTypes.string,
	handleLogout: PropTypes.func,
	fetchProducts: PropTypes.func,
	role: PropTypes.string,
	status: PropTypes.string,
	uid: PropTypes.string,
	username: PropTypes.string
}