import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, paw, add, person, menu } from 'ionicons/icons';
import Home from './pages/Home';
import Walks from "./pages/Walks";
import Add from './pages/Add';
import Menu from "./pages/Menu";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Next from './pages/Next';
import Splash from './pages/Splash';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Start from "./pages/Start";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";
import DogProfileSetup from "./pages/DogProfileSetup";
import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
import Onboarding3 from "./pages/Onboarding3";
import { useEffect, useState } from "react";

setupIonicReact();

function PrivateRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/walks">
          <Walks />
        </Route>
        <Route exact path="/add">
          <Add />
        </Route>
        <Route exact path="/splash">
            <Splash/>
          </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route path="/next">
            <Next/>
        </Route>
        <Route exact path="/menu">
          <Menu />
        </Route>
        <Route exact path="/usersetup">
          <ProfileSetup />
        </Route>
        <Route exact path="/dogsetup">
          <DogProfileSetup />
        </Route>
        <Route exact path="/onboarding1">
          <Onboarding1 />
        </Route>
        <Route exact path="/onboarding2">
          <Onboarding2 />
        </Route>
        <Route exact path="/onboarding3">
          <Onboarding3 />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton tab="walks" href="/walks">
          <IonIcon icon={paw} />
        </IonTabButton>
        <IonTabButton tab="add" href="/add">
          <IonIcon icon={add} />
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={person} />
        </IonTabButton>
        <IonTabButton tab="menu" href="/menu">
          <IonIcon icon={menu} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

function PublicRoutes() {
  return (
    <IonRouterOutlet>
      <Route exact path="/start">
        <Start />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </IonRouterOutlet>
  );
}
   
  
export default function App() {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(
    localStorage.getItem("userIsAuthenticated")
  );
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // User is authenticated
        setUserIsAuthenticated(true);
        localStorage.setItem("userIsAuthenticated", true);
      } else {
        // User is signed out
        setUserIsAuthenticated(false);
        localStorage.removeItem("userIsAuthenticated", false);
      }
    });
  }, [auth]);

  return (
    <IonApp>
      <IonReactRouter>
        {userIsAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
        <Route>
          {userIsAuthenticated ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/start" />
          )}
        </Route>
      </IonReactRouter>
    </IonApp>
  );
}
