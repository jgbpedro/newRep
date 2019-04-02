import React from 'react'

import {
   Route,
   IndexRoute
} from 'react-router-dom'

//import components
import App from './components/App'

import {
   AuthContainer,
   LoginContainer,
   ProfileContainer,
   
} from './containers'



const Routes = (
   <App>
      <Route path="/" exact component={AuthContainer} />
      <Route path='/auth' component={AuthContainer} />
      <Route path='/login' component={LoginContainer} />
      <Route path='/perfil' component={ProfileContainer} />
   </App>
)

export default Routes