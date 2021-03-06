import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButtons,IonBackButton, IonLabel} from '@ionic/react';
import './Next.css';
import dog1 from '../images/dog1.jpg';
import dog2 from '../images/dog2.jpg';
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
const Next = () => {
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
                </ion-text>
                <ion-grid>
                  <ion-row>
                    <ion-col size="3">
                      <ion-avatar>
                        <img src={dog1} alt="dog" onClick={imageClickDog1}/>
                      </ion-avatar>
                    </ion-col>
                    <ion-col size="3">
                    <ion-avatar>
                        <img src={dog2} alt="dog" onClick={imageClickDog2}/>
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
                <ion-text color="warning">
                    <div class = "ion-padding-start"><p>Pick time and date for GoWalkies</p></div>
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
            <ion-button href="/splash" expand="block" color="warning">Add walk</ion-button>
        </div>
            </IonContent>
        </IonPage>
    );
  };
export default Next;