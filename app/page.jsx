import Filter from "./components/Filter"
import "./main.css"
import NavBar from "./components/NavBar"
import Main from "./components/Main"
import Footer from "./components/Footer"


const Home = async () => {
  return (
    <main>
      <NavBar />
      <Main />
      <Footer />
    </main>
  )
}

export default Home
