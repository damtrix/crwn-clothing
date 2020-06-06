import React from 'react'
import { connect } from 'react-redux'


import CartIcon from '../cart-icon/cart-icon.component'

import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { createStructuredSelector } from 'reselect'

import { selectCurrentUser } from '../../redux/user/user.selectors'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { ReactComponent as Logo } from '../../assests/crown.svg'
import { signOutStart } from '../../redux/user/user.actions'

import { HeaderContainer, OptionLink, OptionsContainer, LogoContainer } from './header.styles'

const Header = ({ currentUser, hidden, signOutStart }) => (
<HeaderContainer> 
    <LogoContainer to = "/">
        <Logo className = 'logo' />
    </LogoContainer>
    <OptionsContainer>
        <OptionLink to = "/shop">
            SHOP 
        </OptionLink>
        <OptionLink to = "/contact">
            CONTACT 
        </OptionLink>
        {
            currentUser ?
            <OptionLink as = 'div' onClick = {signOutStart}>SIGN OUT</OptionLink>
            :
            <OptionLink to = "/signin">SIGN IN</OptionLink>
        }
        <CartIcon />

    </OptionsContainer>
    
    {
        hidden ? null : <CartDropdown />
    }

</HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
    )(Header)