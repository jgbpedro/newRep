import React from 'react'
import {
	Link
} from 'react-router'
//components
import AppBar from 'material-ui/AppBar';

class Header extends React.Component {
	render() {
		return (
			<div>
				<AppBar title="Teste - 3X Solutions"  showMenuIconButton={false} className="text-center"></AppBar>
			</div>
		)
	}
}

export default Header