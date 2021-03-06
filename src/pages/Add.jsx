import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  useIonLoading,
} from "@ionic/react";
import "./Add.css";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Toast } from "@capacitor/toast";
import { postsRef } from "../firebase-config";
import { push, set } from "firebase/database";
import { storage } from "../firebase-config";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import PostForm from "../components/PostForm";
import { useState, useEffect } from "react";
import {dogsRef } from "../firebase-config";
import { onValue } from "@firebase/database";

export default function Add() {
  const history = useHistory();
  const [showLoader, dismissLoader] = useIonLoading();
  const auth = getAuth();
  const [dogs, setDogs] = useState([]);
  const [user, setUser] = useState({});

  console.log(dogs);
  console.log(uploadImage)

  useEffect(() => {
    setUser(auth.currentUser);
    async function listenOnChange() {
      onValue(dogsRef, async (snapshot) => {
        // const users = await getUsers();
        const dogsArray = [];
        snapshot.forEach((dogSnapshot) => {
          const id = dogSnapshot.key;
          const data = dogSnapshot.val();
          const dog = {
            id,
            ...data,
          };
          if (user.uid === dog.id) {
            dogsArray.push(dog);
          }
        });
        setDogs(dogsArray.reverse());
      });
    }
    listenOnChange();
  }, [auth.currentUser, user]);


  async function handleSubmit(newPost) {
    showLoader();
    newPost.uid = auth.currentUser.uid; // default user id added
    const newPostRef = push(postsRef); // push new to get reference and new id/key 
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

   async function uploadImage(image, postKey) {
     const newImageRef = ref(storage, `${postKey}.${image.format}`);
     await uploadString(newImageRef, image.dataUrl, "data_url");
     const url = await getDownloadURL(newImageRef);
     return url;
   }
  let dogParams;
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="topbar">
          <IonButtons slot="start">
            <IonBackButton className="back-btn" text="" defaultHref="home" />
          </IonButtons>
          <h1 className="topbar-title">Add walk</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PostForm handleSubmit={handleSubmit} post={dogParams}/>
      </IonContent>
    </IonPage>
  );
}
