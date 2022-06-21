import { Route } from "react-router-dom";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import Activity from "./components/create-activity/Activity";
import CountryDetail from "./components/country-detail/CountryDetail";

function App() {
  return (
    <div className="container">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={Activity} />
      <Route exact path="/country/:id" component={CountryDetail} />
    </div>
  );
}

export default App;
