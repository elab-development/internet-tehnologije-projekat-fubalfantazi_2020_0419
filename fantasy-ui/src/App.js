import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import PremierLeagueBadges from "./components/PremierLeagueBadges";
import Navigation from "./components/Navigation";
import PageTitle from "./components/PageTitle";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import CreateTeam from "./pages/CreateTeam";
import Footer from "./components/Footer";
import MyTeam from "./pages/MyTeam";
import Admin from "./pages/Admin";

function App() {

  return (
    <>
        <PremierLeagueBadges />
        <Navigation />
        <Container className="glavni">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/create-team" element={<CreateTeam />} />
                    <Route path="/my-team" element={<MyTeam />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </Container>
        <Footer />
    </>
  );
}

export default App;
