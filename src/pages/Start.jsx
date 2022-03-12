import {
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
} from "@ionic/react";
import StartImg from "../images/start.jpg";
import "./Start.css";



const Start = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonImg className="post-img" src={StartImg} />
      </IonHeader>
      <IonContent>
        <div className="start-container">
          <h2 className="start-headline">GoWalkies</h2>
          <p className="start-text">Walking Paws. Happy Dogs.</p>

        
          <button href="/signup" className="signup-btn">
            Sign up
          </button>
          <button href="/login" className="login-btn">
            Login
          </button>
        
        </div>
      </IonContent>


    </IonPage>
  );
};

export default Start;
