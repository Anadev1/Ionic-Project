import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButtons,IonBackButton, IonImg } from '@ionic/react';
import img1 from '../images/dog.png';
import loading from '../images/loading.png';
import './Splash.css';

const Splash = () => {
    return (
        <IonPage onLoad={setTime()}>
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
                        <IonTitle size="large">ADD WALK</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonImg class="img" src={img1} />
                <div class="loader">
                    <IonImg class="load" src={loading}/>
                </div>
            </IonContent>
        </IonPage>
    );
}
function setTime(){
    setTimeout(function(){
       window.location.href="/home"
    },3000);
}
export default Splash;