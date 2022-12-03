import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import { ListAll } from "./pages/ListAll";
import { Messenger } from "./pages/Messenger";

function App() {
  return (
      <Router>
        <Route path="/login" component={Login} exact />
        <Route path="/messenger" component={Messenger} exact />
        <Route path="/messenger/:id" component={Messenger} exact />
        <Route path="/listallusers" component={ListAll} exact />
        <Route path="/editprofile" component={EditProfile} exact />
        <Route path="/profile/:id" component={Profile} exact />
        <Route path="/notifications" component={Notifications} exact />
        <Route path="/" component={Home} exact />
      </Router>
  );
}

export default App;
