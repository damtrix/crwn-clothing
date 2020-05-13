import React, {Component} from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.css';
import { createStructuredSelector} from 'reselect'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import CheckoutPage from './pages/checkout/checkout.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions' 
import { selectCurrentUser } from './redux/user/user.selectors'

class App extends Component {

    unSubscribeFromAuth = null

    componentDidMount() {
      const {setCurrentUser} = this.props

      this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if(userAuth) {
          const userRef = createUserProfileDocument(userAuth);
        
          (await userRef).onSnapshot(snapShot => {
              setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
            })
          })

        }
      });
    }

    componentWillUnmount() {
      this.unSubscribeFromAuth()
    }

  render(){
  return (
    <div >
      <Header />
      <Switch>
        <Route exact path = '/' component = {HomePage} />
        <Route path = '/shop' component = {ShopPage} />
        <Route path = '/checkout' component = { CheckoutPage } />
        <Route exact path = '/signin' render = {() => this.props.currentUser ?
         (<Redirect to = '/' />)
         : 
         (<SignInAndSignUpPage />
          )} 
          />
      </Switch>
      
    </div>
  );
}
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, 
  mapDispatchProps
  )(App);
