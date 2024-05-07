"use client";
const { Formik, ErrorMessage, Field } = require("formik");
import * as yup from "yup";
import "../setup/setup.css";
import { useState } from "react";
import ConfirmEmail from "./ConfirmEmail";
import Link from "next/link";

const registerSchema = yup.object().shape({
  userName: yup.string().required("required"),
  email: yup
    .string()
    .email("the email format is not correct")
    .required("required"),
  password: yup
    .string()
    .required("required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "La contraseña debe tener al menos 8 caracteres y contener letras mayúsculas, minúsculas y números"
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "The password have to match with the password above"
    )
    .required(),
});

const initailaState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const PostUser = async (values) => {
  try {
    const resp = await fetch("http://localhost:3008/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(resp);
    const resp2 = await resp.json();
    return resp2;
  } catch (error) {
    return error;
  }
};

const RegisterForm = () => {
  const [validateAccount, setValidateAccount] = useState(false);
  const [values, setValues]= useState({})
  const registerSubmit = async (values, onSubmitProps) => {
    await PostUser(values)
    setValues(values)
    setValidateAccount(true);
     onSubmitProps.resetForm()
  };

  return (
    <>
    <Formik
      initialValues={initailaState}
      validationSchema={registerSchema}
      onSubmit={(values, onSubmitProps) =>
        registerSubmit(values, onSubmitProps)
      }
    >
      {({
        values,
        touched,
        handleBlur,
        handleChange,
        errors,
        resetForm,
        handleSubmit,
      }) => (
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="user__name__div">
            <label htmlFor="userName">User Name</label>
            <Field name="userName" type="text" className="user__name__input" />
            <ErrorMessage
              name="userName"
              render={(msg) => (
                <span style={{ color: "red" }}>
                  {msg.charAt(0).toUpperCase() + msg.slice(1)}
                </span>
              )}
            />
          </div>
          <div className="email__div">
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" className="email__input" />
            <ErrorMessage
              name="email"
              render={(msg) => (
                <span style={{ color: "red" }}>
                  {msg.charAt(0).toUpperCase() + msg.slice(1)}
                </span>
              )}
            />
          </div>
          <div className="password__div">
            <label htmlFor="password">Password</label>
            <Field name="password" type="text" className="password__input" />
            <ErrorMessage
              name="password"
              render={(msg) => (
                <span style={{ color: "red" }}>
                  {msg.charAt(0).toUpperCase() + msg.slice(1)}
                </span>
              )}
            />
          </div>
          <div className="confirm__password__div">
            <label htmlFor="email">Confirm your password</label>
            <Field
              name="confirmPassword"
              type="text"
              className="confirm__password__input"
            />
            <ErrorMessage
              name="confirmPassword"
              render={(msg) => (
                <span style={{ color: "red" }}>
                  {msg.charAt(0).toUpperCase() + msg.slice(1)}
                </span>
              )}
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center'
          }}>
          <button type="submit" className="submit__button">
            Create account
          </button>
          <span style={{
            marginTop: '7px',
            fontSize: '14px'
          }}>If you already have an account, <Link href='/login'>login</Link></span>
          </div>
        </form>
      )}
      
    </Formik>
    {validateAccount ? <ConfirmEmail Values={values}/> : ''}
    </>
  );
};

export default RegisterForm;
