import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import { graphql, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';
import CircularProgress from 'material-ui/CircularProgress';
import {
  requestCurrentUser,
  requestCurrentUserSuccess,
  requestFaild,
  requestLogoutSuccess,
  requestUpdateUser,
  resetLogoutStatus,
  resetUserStatus
} from '../actions';
import ErrorContent from '../components/ErrorContent';
import Profile from '../components/Profile';
import getCurrentUser from '../graphql/CurrentUserQuery.graphql';
import logoutMutation from '../graphql/Logout.graphql';
import updateUserMutation from '../graphql/UpdateUser.graphql';
import products from '../graphql/ProductsQuery.graphql';


class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.props.resetLogoutStatus();
    this.props.resetUserStatus();
  }

  async componentDidMount() {
    try {
      const token = localStorage.getItem('token');
      if (!token) this.props.history.push('/login');
      else {
        this.props.requestCurrentUser();
        const currentUser = await this.props.client.query({
          query: getCurrentUser
        });
        this.props.requestCurrentUserSuccess(currentUser.data.me);
      }
    } catch (error) {
      this.props.requestFaild(error);
    }
  }

  async fetchProducts() {
    try {
      const token = localStorage.getItem('token');
      if (!token) this.props.history.push('/login');
      else {
        this.props.requestProducts();
        const Products = await this.props.client.query({
          query: products
        });
        this.props.requestProductsSuccess(Products.data.productName);
      }
    } catch (error) {
      this.props.requestFaild(error);
    }
  }

  componentWillReceiveProps(nextProps) {
    const logout_status = nextProps.logout.status;
    if (logout_status === 'success') this.props.history.push('/login');
  }

  async handleLogout() {
    try {
      await this.props.client.mutate({
        mutation: logoutMutation
      });
      localStorage.removeItem('token');
      this.props.requestLogoutSuccess();
    } catch (error) {
      this.props.requestFaild(error);
    }
  }


  async handleUpdateUser(displayName, uid, username) {
    try {
      await this.props.client.mutate({
        mutation: updateUserMutation,
        variables: {displayName, id: uid, username}
      });
      this.props.requestUpdateUserSuccess(displayName, username);
    } catch (error) {
      this.props.requestFaild(error);
    }
  }

  render() {
    const {
			user
		} = this.props
    const self = this;
    const renderStatus = {
      loading: function () {
        return (<div className="text-center">
          <CircularProgress size={160} thickness={7} />
        </div>)
      },
      error: function () {
        return (
          <div className="text-center">
            <ErrorContent message={'Sessão Expirada!'} />
            <Link to='/login'>Fazer login</Link>
          </div>)
      },
      success: function () {
        return (
          <Profile displayName={user.displayName} role={user.role} uid={user.uid} username={user.username} handleUpdateUser={self.handleUpdateUser.bind(self)} handleLogout={self.handleLogout.bind(self)} fetchProducts={self.fetchProducts.bind(self)} />
        )
      }
    }
    if (renderStatus.hasOwnProperty(user.status)) return renderStatus[user.status]()
    return (<div></div>)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    logout: state.logout
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    requestCurrentUser,
    requestCurrentUserSuccess,
    requestFaild,
    requestLogoutSuccess,
    requestUpdateUser,
    resetLogoutStatus,
    resetUserStatus
  }, dispatch)
}

ProfileContainer.propTypes = {
  client: PropTypes.instanceOf(ApolloClient).isRequired,
  requestProducts: PropTypes.func,
  requestProductsSuccess: PropTypes.func,
  requestCurrentUser: PropTypes.func,
  requestCurrentUserSuccess: PropTypes.func,
  requestFaild: PropTypes.func,
  requestLogoutSuccess: PropTypes.func,
  user: PropTypes.object
}

const ProfileWithApollo = withApollo(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWithApollo)