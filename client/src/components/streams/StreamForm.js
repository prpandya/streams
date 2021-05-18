import React from 'react';
import { Field, reduxForm } from 'redux-form'; // Field is a react component while reduxForm is a function

class StreamForm extends React.Component {
    // Helper method
    // Touched shows error message when focusing out of the input box
    // Error is the errors message that was assigned in validate function
    renderError({ error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    // Pass the label prop from the Field element
    renderInput = ({ input, label, meta }) => {
        // Conditionally adds the error class
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        // Takes the formProps input property and add them as property to input element
        return (
            <div className={className}>
                <label>{ label }</label>
                <input {...input} autoComplete="off"/>
                { this.renderError(meta) }
            </div>
        );
    }

    // Helper method
    onSubmit = (formValues) => {
        // Make a network request to the API server
        this.props.onSubmit(formValues)
    }

    

    render() {
        return (
            // OnSubmit when the form is submitted
            // this.props.handleSubmit is a redux form function and we pass the this.onSubmit to
            // HandleSubmit also takes care of the event.preventDefault()
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        // Only run if user didn't enter a title
        errors.title = 'You must enter a title'
    }
    if (!formValues.description) {
        // Only run if user didn't enter a description
        errors.description = 'You must enter a description'
    }
    // Return the errors if a condition is met
    return errors;

};

// StreamForm is warapped inside by redux Form
export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm); 
