import {
  IonItem,
  IonInput,
  IonImg,
  IonButton,
  IonLabel,
  IonIcon,
  IonTextarea,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { uploadString, ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../firebase-config";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";

export default function DogForm({ dog, handleSubmit }) {
  const history = useHistory();
  const auth = getAuth();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(auth.currentUser);
    if (dog) {
      setName(dog.name);
      setAge(dog.age);
      setBreed(dog.breed);
      setAdditionalInfo(dog.additionalInfo);
      setImage(dog.image);
    }
  }, [dog, auth.currentUser]);

  async function submitEvent(event) {
    event.preventDefault();
    const formData = {
      name: name,
      age: age,
      breed: breed,
      additionalInfo: additionalInfo,
      image: imageFile,
      id: user.uid,
    };

    if (imageFile.dataUrl) {
      const imageUrl = await uploadImage();
      formData.image = imageUrl;
    }
    handleSubmit(formData);
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
    <form onSubmit={submitEvent}>
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
            required
          />
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel position="stacked">Age</IonLabel>
          <IonInput
            value={age}
            type="text"
            onIonChange={(e) => setAge(e.target.value)}
            required
          />
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel position="stacked">Breed</IonLabel>
          <IonInput
            value={breed}
            type="text"
            onIonChange={(e) => setBreed(e.target.value)}
            required
          />
        </IonItem>
        <IonItem className="ion-no-padding">
          <IonLabel position="stacked">Additional information</IonLabel>
          <IonTextarea
            className="add-textarea"
            value={additionalInfo}
            type="text"
            onIonChange={(e) => setAdditionalInfo(e.target.value)}
            required
          />
        </IonItem>
      </div>

      <div className="ion-padding">
        {image && name && age && breed && additionalInfo ? (
          <IonButton expand="block">Save</IonButton>
        ) : (
          <IonButton
            className="save-btn"
            type="submit"
            expand="block"
            disabled
            onClick={() => history.replace("/profile")}
          >
            Save
          </IonButton>
        )}
      </div>
    </form>
  );
}
