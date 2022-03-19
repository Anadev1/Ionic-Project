import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
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
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [showLoader, dismissLoader] = useIonLoading();

  useEffect(() => {
    setUser(auth.currentUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setName(userData.name);
        setAddress(userData.address);
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
      address: address,
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
      <IonCard className="user-container">
        <IonCardContent className="user-info-section">
          <div className="user-image-container">
            <IonItem onClick={takePicture} lines="none">
              <IonLabel>Choose Image</IonLabel>
              <IonButton>
                <IonIcon slot="icon-only" icon={camera} />
              </IonButton>
            </IonItem>
            {image && (
              <IonImg
                className="user-profile-photo"
                src={image}
                onClick={takePicture}
              />
            )}
          </div>

          <div className="user-info-text">
            <IonCardSubtitle>{user?.name}</IonCardSubtitle>
            <p>{user?.address}</p>
          </div>
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              value={name}
              type="text"
              placeholder="Type your name"
              onIonChange={(e) => setName(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Address</IonLabel>
            <IonInput
              value={address}
              type="text"
              placeholder="Type your address"
              onIonChange={(e) => setAddress(e.target.value)}
            />
          </IonItem>

          <div className="ion-padding">
            <IonButton
              type="submit"
              expand="block"
              onClick={() => history.replace("/profile")}
            >
              Save User
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </form>
  );
}
