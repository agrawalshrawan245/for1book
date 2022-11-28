import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Image from "./pages/Image";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
      <Router>
        <Route path="/login" component={Login} exact />
        <Route path="/image" component={Image} exact />
        <Route path="/editprofile" component={EditProfile} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/" component={Home} exact />
      </Router>
  );
}

export default App;
