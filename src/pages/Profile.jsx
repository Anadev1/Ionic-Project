import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonIcon,
  IonItem,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLabel,
  IonInput,
  useIonLoading,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { addCircleOutline } from "ionicons/icons";
// import userExamplePhoto from "../images/user-example-photo.png";
import dogExamplePhoto from "../images/dog-example-photo.png";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef } from "../firebase-config";
import { get, update } from "@firebase/database";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../firebase-config";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";
import { Toast } from "@capacitor/toast";

export default function Profile() {
  const history = useHistory();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [showLoader, dismissLoader] = useIonLoading();

  console.log(name);

  useEffect(() => {
    setUser(auth.currentUser);

    async function getUserDataFromDB() {
      const snapshot = await get(getUserRef(user.uid));
      const userData = snapshot.val();
      if (userData) {
        setName(userData.name);
        setAddress(userData.address);
      }
    }

    if (user) getUserDataFromDB();
  }, [auth.currentUser, user]);

  function handleSignOut() {
    signOut(auth);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    showLoader();

    const userToUpdate = {
      name: name,
      address: address,
      image: image,
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

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
                <IonLabel position="stacked">Title</IonLabel>
                <IonInput
                  value={address}
                  type="text"
                  placeholder="Type your address"
                  onIonChange={(e) => setAddress(e.target.value)}
                />
              </IonItem>

              <div className="ion-padding">
                <IonButton type="submit" expand="block">
                  Save User
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </form>

        <h2 className="dogs-container-title">My Dog(s)</h2>
        <ul className="dogs-container">
          <li
            className="dog-container"
            onClick={() => history.replace("/dogprofile")}
          >
            <IonImg
              src={dogExamplePhoto}
              className="dog-profile-photo"
              alt="dog"
            />
            <p className="dog-name">Amazing</p>
          </li>
          <li className="dog-container">
            <IonImg
              src={dogExamplePhoto}
              className="dog-profile-photo"
              alt="dog"
            />
            <p className="dog-name">Amazing</p>
          </li>
          <IonIcon icon={addCircleOutline} className="add-icon" />
        </ul>

        <IonButton onClick={handleSignOut}>Log Out</IonButton>
      </IonContent>
    </IonPage>
  );
}
