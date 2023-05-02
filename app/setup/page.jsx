import NavBar2 from "../components/NavBar2";
import "./setup.css";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <>
      <NavBar2 />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1 className="setup__title">Create a new account</h1>
          <hr
            style={{
              marginTop: "-15px",
              width: "75%",
            }}
          />
        </div>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
