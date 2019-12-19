import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardForm = ({ values, errors, touched, status }) => {
  console.log("values", values);
  console.log("errors", errors);
  console.log("touched", touched);

  const [userstuff, setUserStuff] = useState([]);

  useEffect(() => {
    console.log("status has changed!", status);

    status && setUserStuff(users => [...users, status]);
  }, [status]);
  return (
    <div className="newuser-form">
      <Form>
        <label htmlFor="username">
          Username
          <Field
            id="username"
            type="text"
            name="username"
            placeholder="enter name"
          />
          {touched.username && errors.username && (
            <p className="errors">{errors.username}</p>
          )}
        </label>
        <label htmlFor="email">
          Email
          <Field
            id="email"
            type="text"
            name="email"
            placeholder="enter email"
          />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>
        Password
        <Field
          id="password"
          type="text"
          name="password"
          placeholder="enter new password"
        />
        {touched.password && errors.password && (
          <p className="errors">{errors.password}</p>
        )}
        <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="termsofservice"
            checked={values.termsofservice}
          />
          
        </label>
        <button type="submit">Submit!</button>
      </Form>
      {userstuff.map(user => {
        return (
          <ul key={user.id}>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
            <li>Password: {user.password}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikOnboardForm = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || "",
      email: props.email || "",
      password: props.password || "",
      vaccinations: props.termsofservice || false
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required("username required"),

    email: Yup.string().required("email Required"),
    password: Yup.string().required("password required"),
    termsofservice: Yup.bool().required("required")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);

        setStatus(res.data);

        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(OnboardForm);
export default FormikOnboardForm;
