"use client";
import { ErrorMessage, Field, Formik } from "formik";
import "../login/login.css";
import * as yup from 'yup'
import Link from "next/link";
import { useContext } from "react";
import { GlobalState } from "@/context/GlobalState";

const loginSchema = yup.object().shape({
  email: yup.string().required("required").email('the email format is not correct'),
  password: yup
    .string()
    .required("required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "La contraseña debe tener al menos 8 caracteres y contener letras mayúsculas, minúsculas y números"
    ),
});

const InitialValuesLogin = {
  email: "",
  password: "",
};

const login = async (values) => {
  try {
    const LoggedUser = await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(values)
  })
  const LoggedIn = await LoggedUser.json()
  return LoggedIn 
  } catch (error) {
    return error
  }
}

const LoginForm = () => {
  // const dispatch = useDispatch()
  const {setLogin} = useContext(GlobalState)
  const handleSubmitLogin = async (values, onSubmitProps) => {
    const {token, selectedUser} = await login(values)
    onSubmitProps.resetForm()
    if (token && selectedUser) {
        // dispatch(setLogin({
        //     user: selectedUser,
        //     token
        // }))
       setLogin(selectedUser, token)
       window.location.href = '/'
    } else if (!token) {
        console.log('Error while creating authentication')
    }
  };

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={InitialValuesLogin}
      onSubmit={(values, onSubmitProps) =>
        handleSubmitLogin(values, onSubmitProps)
      }
    >
      {({ handleSubmit, values, touched, handleBlur, handleChange }) => (
        <form onSubmit={handleSubmit} className="login__form">
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
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center'
          }}>
          <button type="submit" className="submit__button">
            Login
          </button>
          <span style={{
            marginTop: '7px',
            fontSize: '14px'
          }}>If you do not have an account, <Link href='/setup'>Create an account</Link></span>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
