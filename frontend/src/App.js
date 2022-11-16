import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {
  return (
    <div className="">
      <Router>
        <Route path="/login" component={Login} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/" component={Home} exact />
      </Router>
    </div>
  );
}

export default App;
