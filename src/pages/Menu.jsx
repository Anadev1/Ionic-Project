import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { get } from "@firebase/database";


export default function Menu() {

const auth = getAuth();
const [user, setUser] = useState({});
const [name, setName] = useState("");

  console.log(name);

useEffect(() => {
  setUser(auth.currentUser);

  async function getUserDataFromDB() {
    const snapshot = await get(getUserRef(user.uid));
    const userData = snapshot.val();
    if (userData) {
      setName(userData.name);
    }
  }

  if (user) getUserDataFromDB();
}, [auth.currentUser, user]);

function handleSignOut() {
  signOut(auth);
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={handleSignOut}>Log Out</IonButton>
      </IonContent>
    </IonPage>
  );
};

