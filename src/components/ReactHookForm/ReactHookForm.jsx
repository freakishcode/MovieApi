import "./ReactHookForm.css";

// external library for form control
import { useForm } from "react-hook-form"; // npm i react-hook-form

//A medium to connect zod & REACT HOOK FORM
import { zodResolver } from "@hookform/resolvers/zod"; // npm i @hookform/resolvers

// external library for form validation for REACT HOOK FORM
import { z } from "zod"; // npm i zod

import axios from "axios";

// External library for form validation
const schema = z.object({
  fullName: z.string().regex(/[a-z]/),
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

function ReactHookForm() {
  // React hook form works like object
  const {
    register, // for collecting input data
    handleSubmit, // Responsible for form submission
    formState: { errors /* isSubmitting*/ }, // error displace
    setError,
  } = useForm({
    // integrating Zod Into REACT HOOK FORM
    resolver: zodResolver(schema),
  });

  // submitting form
  const SubmitForm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/postData",
        { key: "FormDataValues" },
        { headers: { "Content-Type": "application/json" } }
      );

      // storing form data to local storage
      localStorage.setItem("ReactFormData", response.data);

      console.log(response.data);
    } catch (error) {
      // condition if data didn`t respond to post data
      if (error.response.status == 404) {
        setError("unable to respond to post data ");
      } else {
        console.error(error);
      }
    } finally {
      alert("Form Submitted Successfully");
    }
  };

  // const SubmitForm = async (data) => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     console.log(data);
  //     throw new Error();
  //   } catch {
  //     setError("root", { message: "this email is already taken" });
  //   }
  // };

  return (
    <div className='FormContainer'>
      <h3 className='header'>React Hook Form</h3>

      <form onSubmit={handleSubmit(SubmitForm)}>
        {/*  Backend error handler using React Hook Form */}
        {errors.root && (
          <div style={{ color: "red" }}>{errors.root.message}</div>
        )}

        {/* FULL NAME INPUT FIELD */}
        <div className='input'>
          <label htmlFor='fullName'>fullName</label>
          <input
            type='text'
            id='fullName'
            {...register("fullName")}
            placeholder='Enter Your fullName'
          />
          {/* React Hook Form error handler */}
          <div className='error'>{errors.fullName?.message}</div>
        </div>

        {/* EMAIL INPUT FIELD */}
        <div className='input'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            {...register("email", {
              required: "Email is Required" /*
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
                message: "invalid email format",
              },*/,
            })}
            placeholder='Enter Email'
          />
          {/* React Hook Form error handler */}
          <div className='error'>{errors.email?.message}</div>
        </div>

        {/* PASSWORD INPUT FIELD */}
        <div className='input'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            {...register(
              "password" /*, {
              required: "Password mustn't be empty & shouldn't be less than 4 ",
              minLength: 4,
            }*/
            )}
            placeholder='Enter password'
          />
          {/* React Hook Form error handler */}
          <div className='error'>{errors.password?.message}</div>
        </div>

        {/* Button To Submit Form */}
        <div className='action'>
          <button className='btn_aj' type='submit'>
            Submit
          </button>

          {/* <button disabled={isSubmitting} className='btn_aj' type='submit'>
          {isSubmitting ? "Submitting Form Data" : "submit"}
        </button> */}

          {/* Button To Route To Register Form */}
          <button className='btn_aj' type='button'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReactHookForm;
