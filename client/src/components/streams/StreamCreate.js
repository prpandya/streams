import React from 'react';
// import { Field, reduxForm } from 'redux-form'; // Field is a react component while reduxForm is a function
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
    // Helper method
    onSubmit = (formValues) => {
        // Make a network request to the API server
        this.props.createStream(formValues)
    }

    render() {
        return (
            <div className="">
                <h3>Create A Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, { createStream })(StreamCreate);