"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import NavBar2 from "../components/NavBar2";
import "./sell.css";
import * as yup from "yup";
import Link from "next/link";
// import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { GlobalState } from "@/context/GlobalState";
import Footer from "../components/Footer";

const sellSchema = yup.object().shape({
  accountName: yup.string().required("required"),
  link: yup.string().required("required").min(15),
  accountEmail: yup
    .string()
    .email("The email format is not valid")
    .required("required"),
  emailPassword: yup.string().required("required"),
  accountPassword: yup.string().required("required"),
  acceptTerms: yup
    .bool()
    .oneOf(
      [true],
      "You have to accept terms and conditions to sell the account"
    ),
  pastContent: yup
    .string()
    .oneOf([
      "entreteinment",
      "knowdlege",
      "explicit content or no demostrable content",
    ])
    .required("required"),
});

const initialSellState = {
  accountName: "",
  link: "",
  accountEmail: "",
  emailPassword: "",
  accountPassword: "",
  acceptTerms: false,
  pastContent: "",
};

const PostAccount = async (values) => {
  try {
    const resp = await fetch("https://blascounterserver-production.up.railway.app/api/accounts", {
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

const SellAccount = () => {
  const [token, setToken] = useState()
  useEffect(() => {
    const Token = localStorage.getItem('token')
    setToken(Token)
  }, [])
  const submitHandler = async (values, onSubmitProps) => {
    const resp = await PostAccount(values);
    onSubmitProps.resetForm();
    window.location.href = '/'
  };


  return (
    <>
      {token == null ? (
        <>
          <NavBar2 />
          <div className="no__account__alert">
            <h4>You have to login before sell an account</h4>
          </div>
        </>
      ) : (
        <>
          <NavBar2 />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "80px",
            }}
          >
            <h1 className="sell__title">Sell Your Account</h1>
            <div className="remember__div">
              <h3 className="remember">Remember:</h3>
              <ul className="remember__list">
                <li>
                  We will not post accounts with less than <b>5k followers</b>
                </li>
                <li>
                  We will only post accounts <b>with the name change avaible</b>{" "}
                  <br />
                  (TikTok restrict it one time each 30 days)
                </li>
                <li>
                  You can not claim your account back, but if anyone buy your
                  <br /> account in 30 days, we will return your account to you
                  (with <br></br>the new password and email)
                </li>
                <li>
                  To do the process more sure, only us can post the account, so
                  <br />
                  <b>
                    we will review that all the information that you send to us
                    is
                    <br />
                    correct
                  </b>
                  , if not, we will notificate you that your account will not be
                  posted
                </li>
              </ul>
            </div>
          </div>
          <Formik
            initialValues={initialSellState}
            validationSchema={sellSchema}
            onSubmit={(values, onSubmitProps) =>
              submitHandler(values, onSubmitProps)
            }
          >
            {(
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm
            ) => (
              <Form>
                <div className="public__data__div">
                  <h2 className="public__data__title">PUBLIC DATA</h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      gap: "45px",
                      width: "fit-content",
                      height: "fit-content",
                    }}
                  >
                    <div className="public__data__container">
                      <div className="account__name__div">
                        <label
                          style={{ fontSize: "14px" }}
                          htmlFor="accountName"
                        >
                          Account Name
                        </label>
                        <Field
                          name="accountName"
                          type="text"
                          className="account__name__input"
                          placeholder="ej: Blascounter"
                        />
                        <ErrorMessage
                          name="accountName"
                          render={(msg) => (
                            <span style={{ color: "red" }}>
                              {msg.charAt(0).toUpperCase() + msg.slice(1)}
                            </span>
                          )}
                        />
                      </div>
                      <div className="link__div">
                        <label style={{ fontSize: "14px" }} htmlFor="link">
                          Link
                        </label>
                        <Field
                          name="link"
                          type="text"
                          className="link__input"
                          placeholder="ex. https://www.tiktok.com/@blascounter"
                        />
                        <ErrorMessage
                          name="link"
                          render={(msg) => (
                            <span style={{ color: "red" }}>
                              {msg.charAt(0).toUpperCase() + msg.slice(1)}
                            </span>
                          )}
                        />
                      </div>
                      <div className="past__content__div">
                        <label style={{ fontSize: "14px" }} htmlFor="link">
                          Content that you used to post
                        </label>
                        <Field
                          name="pastContent"
                          as="select"
                          className="past__content__select"
                        >
                          <option
                            value=""
                            style={{
                              color: "gray",
                            }}
                          >
                            Select an option
                          </option>
                          <option value="entreteinment">
                            entreteinment (type 1)
                          </option>
                          <option value="knowdlege">
                            knowdlege (type 2)
                          </option>
                          <option value="explicit content or no demostrable content">
                            explicit content or no demostrable content (type 3)
                          </option>
                        </Field>
                        <ErrorMessage
                          name="link"
                          render={(msg) => (
                            <span style={{ color: "red" }}>
                              {msg.charAt(0).toUpperCase() + msg.slice(1)}
                            </span>
                          )}
                        />
                      </div>
                      <div className="div__decoration" />
                    </div>
                    <div className="pricing">
                      <div>
                        <h4
                          style={{
                            fontSize: "18px",
                            marginTop: "10px",
                          }}
                        >
                          Pricing:
                        </h4>
                        <hr
                          style={{
                            width: "150%",
                            marginLeft: "-18px",
                            marginTop: "-15px",
                            marginBottom: "25px",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "-15px",
                          marginLeft: "20px",
                        }}
                      >
                        If the account is finally posted, the price will be set{" "}
                        <br /> by us, and the price each 10k followers will
                        depend on the type
                        <br />
                        of the content you used to post:
                        <ul>
                          <li>
                            <b>
                              10$ each 10k followers if you used to post
                              entretainment like:
                              <br />
                              video games, clips, comedy, content about
                              vehicles, movies,
                              <br /> sports, edits...
                            </b>
                          </li>
                          <li>
                            <b>
                              12$ each 10k followers if you used to post content
                              about
                              <br /> personal development, tecnology, business,
                              law, news,
                              <br /> economy, science...
                            </b>
                          </li>
                          <li>
                            <b>
                              8$ each 10k followers if you used to post explicit
                              content: drugs, sexual content... or if YOUR PAST
                              CONTENT IS NOT CHECKABLE
                            </b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="private__data__div">
                  <h2 className="private__data__title">PRIVATE DATA</h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      gap: "45px",
                      width: "fit-content",
                      height: "fit-content",
                    }}
                  >
                    <div className="public__data__container">
                      <div className="account__email__div">
                        <label
                          style={{ fontSize: "14px" }}
                          htmlFor="accountEmail"
                        >
                          Email <b>vinculated with the account</b>
                        </label>
                        <Field
                          name="accountEmail"
                          type="text"
                          className="account__email__input"
                          placeholder="ej: blascounter_tiktok@gmail.com"
                        />
                        <ErrorMessage
                          name="accountEmail"
                          render={(msg) => (
                            <span style={{ color: "red" }}>
                              {msg.charAt(0).toUpperCase() + msg.slice(1)}
                            </span>
                          )}
                        />
                      </div>
                      <div className="email__password__div">
                        <label
                          style={{ fontSize: "14px" }}
                          htmlFor="emailPassword"
                        >
                          Password <b>of the email above</b>
                        </label>
                        <Field
                          name="emailPassword"
                          type="text"
                          className="email__password__input"
                          placeholder="ex. blascounter_1234"
                        />
                        <ErrorMessage
                          name="emailPassword"
                          render={(msg) => (
                            <span style={{ color: "red" }}>
                              {msg.charAt(0).toUpperCase() + msg.slice(1)}
                            </span>
                          )}
                        />
                      </div>
                      <div className="account__password__div">
                        <label
                          style={{ fontSize: "14px" }}
                          htmlFor="accountPassword"
                        >
                          Password <b>of the account</b>
                        </label>
                        <Field
                          name="accountPassword"
                          type="text"
                          className="account__password__input"
                          placeholder="ex. 1234abcd"
                        />
                        <ErrorMessage
                          name="accountPassword"
                          render={(msg) => (
                            <span style={{ color: "red" }}>
                              {msg.charAt(0).toUpperCase() + msg.slice(1)}
                            </span>
                          )}
                        />
                      </div>
                      <div
                        style={{
                          marginLeft: "16px",
                        }}
                      >
                        <label
                          style={{ fontSize: "14px" }}
                          htmlFor="acceptTerms"
                        >
                          <Field name="acceptTerms" type="checkbox" />
                          Accept{" "}
                          <Link href="/terms-and-conditions">
                            terms and conditions
                          </Link>
                        </label>
                        <br />
                        <ErrorMessage
                          name="acceptTerms"
                          render={(msg) => (
                            <span style={{ color: "red" }}>
                              {msg.charAt(0).toUpperCase() + msg.slice(1)}
                            </span>
                          )}
                        />
                      </div>
                      <button type="submit" className="submit__button">
                        Sell Account
                      </button>
                      <div className="div__decoration" />
                    </div>
                    <div className="alert">
                      <h4
                        style={{
                          fontSize: "18px",
                          marginLeft: "18px",
                        }}
                      >
                        Important!
                      </h4>
                      <ul>
                        <li
                          style={{
                            lineHeight: "26px",
                          }}
                        >
                          To do the transactio more sure,{" "}
                          <b>
                            you have to give us access to
                            <br /> the email that is vinculated with the
                            account, so WE ENCOURAGE YOU TO
                            <br /> CREATE A NEW EMAIL (with no important
                            information) and vinculate it <br />
                            to the account (for your privacity).
                          </b>{" "}
                          After the transaction, you can delete it
                          <br /> if you want.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <Footer />
        </>
      )}
    </>
  );
};

export default SellAccount;
