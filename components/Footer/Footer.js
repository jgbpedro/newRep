import React from 'react'
import AppBar from 'material-ui/AppBar';
class Footer extends React.Component {
   render() {
      return (
         <nav className="navbar navbar-default navbar-fixed-bottom footer">
            <div className="container-fluid text-center footer-text">
               <span>Desenvolvido por José Guilherme</span>
            </div>
         </nav>
      )
   }
}

export default Footer