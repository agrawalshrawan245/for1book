import { BrowserRouter as Router, Route } from "react-router-dom";
import login from "./pages/login";
import profile from "./pages/profile";
import home from "./pages/home";

function App() {
  return (
    // <div className="container bg-primary">hi</div>
    <Router>
      <Route path="/login" component={login} exact />
      <Route path="/profile" component={profile} exact />
      <Route path="/" component={home} exact />
    </Router>
  );
}

export default App;
