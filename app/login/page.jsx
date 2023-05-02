import LoginForm from '../components/LoginForm'
import NavBar2 from '../components/NavBar2'
import './login.css'

const Login = () => {
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
          <h1 className="setup__title">Login</h1>
          <hr
            style={{
              marginTop: "-15px",
              width: "75%",
            }}
          />
        </div>
        <LoginForm />
        </div>
        </>
    )
}

export default Login