import { IonContent, IonHeader, IonPage, IonToolbar, IonButtons,IonBackButton, IonLabel, IonRow, IonGrid, IonCol, IonAvatar } from '@ionic/react';
import './Add.css';
import dog1 from './assets/dog1.jpg';
import dog2 from './assets/dog2.jpg';
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { walksRef } from "../firebase-config";
import { push, set } from "firebase/database";
import WalksForm from '../components/WalksForm';

const imageClickDog1 = () => {
  var element1 = document.getElementById("dog1");
  var element2 = document.getElementById("dog2");
  element1.style.fontFamily="bold";
  element2.style.fontFamily="sans-serif"
}
const imageClickDog2 = () => {
  var element1 = document.getElementById("dog1");
  var element2 = document.getElementById("dog2");
  element2.style.fontFamily="bold";
  element1.style.fontFamily="sans-serif"
}


export default function Add() {
  const history = useHistory();
  const auth = getAuth();

  async function handleSubmit(newWalk) {
    newWalk.uid = auth.currentUser.uid;
    const newWalkRef = push(walksRef);
    const newWalkKey = newWalkRef.key;
    console.log(newWalkKey);
    /* const imageUrl = await uploadImage(newUser.image, newUserKey); 
    newUser.image = imageUrl; */
    set(newWalkRef, newWalk)
      .then(() => {
        history.replace("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="topbar">
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="home" />
          </IonButtons>
          <h1 className="topbar-title">Add walk</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="add-dog-container">
          <p>Pick a dog to GoWalkies</p>
          <IonGrid>
            <IonRow>
              <IonCol size="3">
                <IonAvatar>
                  <img src={dog1} alt="dog" onClick={imageClickDog1} />
                </IonAvatar>
              </IonCol>
              <IonCol size="3">
                <IonAvatar>
                  <img src={dog2} alt="dog" onClick={imageClickDog2} />
                </IonAvatar>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="3">
                <IonLabel id="dog1" color="warning" className="label">
                  Laica
                </IonLabel>
              </IonCol>
              <IonCol size="3">
                <IonLabel id="dog2" color="warning" className="label">
                  Milo
                </IonLabel>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <WalksForm handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
};
