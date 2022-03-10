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
import Profile from './pages/Profile';
import Menu from "./pages/Menu";
import Start from "./pages/Start";

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
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
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>

          <Route path="/start">
            <Start />
          </Route>
          <Route exact path="/">
            <Redirect to="/start" />
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
    </IonReactRouter>
  </IonApp>
);

export default App;
