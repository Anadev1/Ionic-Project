import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonLabel,
  IonRow,
  IonGrid,
  IonCol,
  IonAvatar,
  useIonLoading,
} from "@ionic/react";
import "./Add.css";
import dog1 from "./assets/dog1.jpg";
import dog2 from "./assets/dog2.jpg";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Toast } from "@capacitor/toast";
import { postsRef } from "../firebase-config";
import { push, set } from "firebase/database";
import { storage } from "../firebase-config";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import PostForm from "../components/PostForm";

const imageClickDog1 = () => {
  var element1 = document.getElementById("dog1");
  var element2 = document.getElementById("dog2");
  element1.style.fontFamily = "bold";
  element2.style.fontFamily = "sans-serif";
};
const imageClickDog2 = () => {
  var element1 = document.getElementById("dog1");
  var element2 = document.getElementById("dog2");
  element2.style.fontFamily = "bold";
  element1.style.fontFamily = "sans-serif";
};

export default function Add() {
  const history = useHistory();
  const [showLoader, dismissLoader] = useIonLoading();
  const auth = getAuth();

  async function handleSubmit(newPost) {
    showLoader();
    newPost.uid = auth.currentUser.uid; // default user id added
    const newPostRef = push(postsRef); // push new to get reference and new id/key
    const newPostKey = newPostRef.key; // key from reference
     console.log(newPostKey);
    const imageUrl = await uploadImage(newPost.image, newPostKey);
    newPost.image = imageUrl; 
    set(newPostRef, newPost)
      .then(() => {
        history.replace("/home");
        Toast.show({
          text: "New post created!",
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
                dismissLoader();
            });
  }

   async function uploadImage(imageFile, postKey) {
     const newImageRef = ref(storage, `${postKey}.${imageFile.format}`);
     await uploadString(newImageRef, imageFile.dataUrl, "data_url");
     const url = await getDownloadURL(newImageRef);
     return url;
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

        <PostForm handleSubmit={handleSubmit} />
      </IonContent>
    </IonPage>
  );
}
