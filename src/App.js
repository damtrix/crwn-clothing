import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth } from './firebase/firebase.utils'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       currentUser: null
    }
  }
    unSubscribeFromAuth = null

    componentDidMount() {
      this.unSubscribeFromAuth = auth.onAuthStateChanged(user =>{
        this.setState({currentUser: user})
      })
    }

    componentWillUnmount() {
      this.unSubscribeFromAuth()
    }

  render(){
  return (
    <div >
      <Header currentUser = {this.state.currentUser} />
      <Switch>
        <Route exact path = '/' component = {HomePage} />
        <Route path = '/shop' component = {ShopPage} />
        <Route path = '/signin' component = {SignInAndSignUpPage} />
      </Switch>
      
    </div>
  );
}
}

export default App;
