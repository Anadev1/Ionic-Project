import {
  IonImg,
  IonIcon,
  IonItem,
  IonButton,
  IonLabel,
  IonInput,
  useIonLoading,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { get, update } from "@firebase/database";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../firebase-config";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";
import { Toast } from "@capacitor/toast";

export default function UserForm() {
  const history = useHistory();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [showLoader, dismissLoader] = useIonLoading();

  useEffect(() => {
    setUser(auth.currentUser)

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setName(userData.name);
        setLocation(userData.location);
        setImage(userData.image);
      }
    }

    if (user) getUserDataFromDB();
  }, [auth.currentUser, user]);

  async function handleSubmit(event) {
    event.preventDefault();
    showLoader();

    const userToUpdate = {
      name: name,
      location: location,
      image: image,
      uid: user.uid,
    };

    if (imageFile.dataUrl) {
      const imageUrl = await uploadImage();
      userToUpdate.image = imageUrl;
    }

    await update(getUserRef(user.uid), userToUpdate);
    dismissLoader();
    await Toast.show({
      text: "User Profile saved!",
      position: "top",
    });
  }

  async function takePicture() {
    const imageOptions = {
      quality: 80,
      width: 500,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    };
    const image = await Camera.getPhoto(imageOptions);
    setImageFile(image);
    setImage(image.dataUrl);
  }

  async function uploadImage() {
    const newImageRef = ref(storage, `${user.uid}.${imageFile.format}`);
    await uploadString(newImageRef, imageFile.dataUrl, "data_url");
    const url = await getDownloadURL(newImageRef);
    return url;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="upload-container">
        <IonItem className="ion-no-padding" onClick={takePicture} lines="none">
          <IonLabel>Choose image</IonLabel>
          <IonButton className="upload-btn">
            <IonIcon className="upload-icon" slot="icon-only" icon={camera} />
          </IonButton>
        </IonItem>
        {image && (
          <IonImg className="edit-img" src={image} onClick={takePicture} />
        )}
      </div>

      <div className="input-container">
        <IonItem className="ion-no-padding">
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput
            value={name}
            type="text"
            onIonChange={(e) => setName(e.target.value)}
          />
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel position="stacked">Location</IonLabel>
          <IonInput
            value={location}
            type="text"
            onIonChange={(e) => setLocation(e.target.value)}
          />
        </IonItem>
      </div>

      <div className="ion-padding">
        <IonButton
          className="save-btn"
          type="submit"
          expand="block"
          onClick={() => history.replace("/profile")}
        >
          Save User
        </IonButton>
      </div>
    </form>
  );
}
