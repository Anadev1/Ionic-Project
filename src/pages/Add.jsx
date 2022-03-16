import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButtons,IonBackButton, IonImg, IonLabel } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Add.css';
import dog1 from './assets/dog1.jpg';
import dog2 from './assets/dog2.jpg';
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
const Add = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><p align="center">ADD WALK</p></IonTitle>
          <IonButtons slot="start">
              <IonBackButton defaultHref="home"/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ion-text color="dark">
          <div class = "ion-padding-start ion-padding-top"><p>Pick a dog to GoWalkies</p></div>
          <ion-grid>
            <ion-row>
              <ion-col size="3">
                <ion-avatar>
                  <img src={dog1} onClick={imageClickDog1}/>
                </ion-avatar>
              </ion-col>
              <ion-col size="3">
              <ion-avatar>
                  <img src={dog2} onClick={imageClickDog2}/>
                </ion-avatar>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="3">
                <IonLabel id="dog1" color="warning" class="label">Laica</IonLabel>
              </ion-col>
              <ion-col size="3">
              <IonLabel id="dog2" color="warning" class="label">Milo</IonLabel>
              </ion-col>
            </ion-row>
          </ion-grid>
          <div class = "ion-padding-start"><p>GoWalkies description(Here you specify date,pick up time,
            additional information about the dog etc.)</p></div>
        </ion-text>
        <div class = "ion-padding-top">
          <ion-item>
            <ion-label position="floating" color="warning">Pick up adress</ion-label>
            <ion-input></ion-input>
          </ion-item>
        </div>
        <br>
        </br>
        <div class = "ion-padding-top">
          <ion-item>
            <ion-label position="floating" color="warning">Breed</ion-label>
            <ion-input></ion-input>
          </ion-item>
        </div>
        <br>
        </br>
        <div class = "ion-padding-top">
          <ion-item>
            <ion-label position="floating" color="warning">Additional information</ion-label>
            <ion-input></ion-input>
          </ion-item>
        </div>
        <div class = "ion-padding-top">
            <ion-button href="/next" expand="block" color="warning">Next</ion-button>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Add;
