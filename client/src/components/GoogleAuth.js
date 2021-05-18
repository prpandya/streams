import React from 'react';
import { connect } from 'react-redux'; // connects to actions
import { signIn, signOut } from '../actions';

// Allows user to login using google authentication
class GoogleAuth extends React.Component {
    // Define state object
    // state = { isSignedIn: null };

    componentDidMount() {
        // Load the API client library
        window.gapi.load('client:auth2', () => {
            // Initialize the library
            window.gapi.client.init({
                clientId: '1086202916161-5aocgc88hepvgqrg0rmvtm9r7a7r2if8.apps.googleusercontent.com',
                scope: 'email'
            }).then(() =>{
                // .then(() => {}) Invokes this function after the GAPI library has been initialized
                // this.auth gets the reference to the auth Instance
                this.auth = window.gapi.auth2.getAuthInstance();
                // Update component state
                this.onAuthChange(this.auth.isSignedIn.get());
                // Listens whether a user is signed in or not
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            // Also gets the current User 
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    // Click even handlers for buttons
    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        // Changes the login text based on sign in status
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={
                    // No () after the function as it will call the function right away and we don't want that
                    this.onSignOutClick
                    } className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={
                    // No () after the function as it will call the function right away and we don't want that
                    this.onSignInClick
                    } className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect( 
    mapStateToProps, 
    { signIn, signOut }
)(GoogleAuth);