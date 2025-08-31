import { useState, useEffect } from "react";
import "./Form.css";

function Form() {
  // store input value
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  // store form errors
  const [formErrors, setFormErrors] = useState({});
  // storing form if submitted
  const [isSubmit, setIsSubmit] = useState(false);

  // input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function postForm(e) {
    e.preventDefault();

    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, isSubmit, formValues]);

  // FORM VALIDATION
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    // USERNAME VALIDATION
    if (!values.name) {
      errors.name = "Name is required!";
    }

    // EMAIL VALIDATION
    if (!values.email) {
      errors.email = "An Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Not a valid email format!";
    }

    // message VALIDATION
    if (!values.message) {
      errors.message = "A message is required";
    } else if (values.message.length < 4) {
      errors.message = "message must be more than 4 characters";
    } else if (values.message.length > 800) {
      errors.message = "message cannot exceed more than 800 characters";
    }
    return errors;
  };

  return (
    <div className='FormContainer1'>
      <header className='title' style={{ textAlign: "center" }}>
        Leave your request here
      </header>

      <form className='form1' onSubmit={postForm}>
        <input
          className='name'
          type='text'
          placeholder='Full name'
          value={formValues.name}
          onChange={handleChange}
        />
        {/* Display Error */}
        <span className='status'>{formErrors.name}</span>

        <input
          className='email'
          type='email'
          placeholder='Email'
          value={formValues.email}
          onChange={handleChange}
        />
        {/* Display Error */}
        <span className='status'>{formErrors.email}</span>

        <input className='msg' type='text' placeholder='Message' />
        {/* Display Error */}
        <span className='status'>{formErrors.message}</span>

        <button type='submit' className='submit'>
          Submit report
        </button>
      </form>

      {/* DISPLAY FORM DATA*/}
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <h2 className='ui message success'>Signed in successfully</h2>
      ) : (
        <div className='display'>
          <h3>Form data</h3>
          {JSON.stringify(formValues, undefined, 2)}
        </div>
      )}
    </div>
  );
}

export default Form;
