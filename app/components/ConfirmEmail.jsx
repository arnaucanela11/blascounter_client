"use client";
const { Formik, ErrorMessage, Field } = require("formik");
import * as yup from "yup";
import "../setup/setup.css";
import { useState } from "react";

const registerSchema = yup.object().shape({
  uuid: yup.string().required("required")
});

const initailaState = {
  uuid: ""
};

const ValidateUser = async (values) => {
  try {
    const resp = await fetch("http://localhost:3008/api/users/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const resp2 = await resp.json();
    return resp2;
  } catch (error) {
    return error;
  }
};

const ConfirmEmail = ({Values}) => {
    const [finalMsg, setFinalMsg] = useState()
  const registerSubmit = async (values ,onSubmitProps) => {
    const {msg} = await ValidateUser({...Values, ...values})
    setFinalMsg(msg)
     onSubmitProps.resetForm()
     setTimeout(() => {
      window.location.href = '/login'
     },
     1000)
  };

  return (
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
        <form className="validate__form" onSubmit={handleSubmit}>
          <div className="user__name__div">
            <label htmlFor="uuid">Verificacion code:</label>
            <Field name="uuid" type="text" className="user__name__input" />
            <ErrorMessage
              name="uuid"
              render={(msg) => (
                <span style={{ color: "red" }}>
                  {msg.charAt(0).toUpperCase() + msg.slice(1)}
                </span>
              )}
            />
          </div>
          <button type="submit" className="validate__button">
            Validate Account
          </button>
          {finalMsg ? <span style={{
            marginLeft: '18px',
            color: 'green'
          }}>{finalMsg}</span> : ''}
        </form>
      )}
    </Formik>
  );
};

export default ConfirmEmail