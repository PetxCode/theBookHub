import "antd/dist/antd.css"
import {BrowserRouter as Router, Switch, Routr, Route} from "react-router-dom"
import HomeScreen from "./components/Contents/HomeScreen";
import NavBar from "./components/Contents/NAvBar";
import Post from "./components/Contents/PostScreens/Post";
import PostDetail from "./components/Contents/PostScreens/PostDetail";
import Profile from "./components/Contents/PostScreens/Profile";
import PrivateRoute from "./components/Contents/Register/PrivateRoute";
import Register from "./components/Contents/Register/Register";
import { AuthProvider } from "./components/Redux/reducers/AuthState";

function App() {
  return (
    <div>
      <AuthProvider>
     <Router>
       <NavBar/>
       <Switch>
         <Route exact path="/" component={HomeScreen} />
         <PrivateRoute exact path="/post" component={Post} />
         <Route exact path="/register" component={Register} />
         <Route exact path="/profile" component={Profile} />
         Profile         <Route exact path="/post/:id" component={PostDetail} />
       </Switch>
     </Router>
     </AuthProvider>
    </div>
  );
}

export default App;
