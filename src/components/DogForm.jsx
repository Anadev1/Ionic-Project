import {
  IonItem,
  IonInput,
  IonImg,
  IonButton,
  IonList,
  IonLabel,
  IonIcon,
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
      <IonItem onClick={takePicture} lines="none">
        <IonLabel>Choose Image</IonLabel>
        <IonButton>
          <IonIcon slot="icon-only" icon={camera} />
        </IonButton>
      </IonItem>
      {image && (
        <IonImg className="ion-padding" src={image} onClick={takePicture} />
      )}
      <IonList>
        <IonItem>
          <IonInput
            className="input-field"
            value={name}
            placeholder="Name"
            onIonChange={(e) => setName(e.target.value)}
            required
          />
        </IonItem>
        <IonItem>
          <IonInput
            className="input-field"
            value={age}
            placeholder="Age"
            onIonChange={(e) => setAge(e.target.value)}
            required
          />
        </IonItem>
        <IonItem>
          <IonInput
            className="input-field"
            value={breed}
            placeholder="Breed"
            onIonChange={(e) => setBreed(e.target.value)}
            required
          />
        </IonItem>
        <IonItem>
          <IonInput
            className="input-field"
            value={additionalInfo}
            placeholder="Additional Information"
            onIonChange={(e) => setAdditionalInfo(e.target.value)}
            required
          />
        </IonItem>

        <div className="ion-padding">
          {image && name && age && breed && additionalInfo ? (
            <IonButton expand="block">Save</IonButton>
          ) : (
            <IonButton
              type="submit"
              expand="block"
              disabled
              onClick={() => history.replace("/profile")}
            >
              Save
            </IonButton>
          )}
        </div>
      </IonList>
    </form>
  );
}
