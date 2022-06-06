import {
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonLabel,
  IonIcon,
  IonImg,
  IonTextarea,
  IonDatetime,
} from "@ionic/react";
import { useState, useEffect } from "react";
import Select from "react-select";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";
import AddressesService from "../services/addressesService";

export default function PostForm({ post, handleSubmit }) {
  const [dogName, setDogName] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({});

  useEffect(() => {
    if (post) {
      setDogName(post.dogName);
      setTime(post.time);
      setAddress(post.address);
      setDescription(post.description);
      setImage(post.image);
    }
  }, [post]);

  function submitEvent(event) {
    event.preventDefault();
    const formData = {
      dogName: dogName,
      time: time,
      address: address.value,
      description: description,
      image: imageFile,
    };
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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <form onSubmit={submitEvent}>
      <IonList>
        <div className="header-container">
          <h2>Who's going on a walk today?</h2>
          <IonItem
            className="ion-no-padding"
            onClick={takePicture}
            lines="none"
          >
            <IonLabel className="add-headline">
              Insert an image of your dog
            </IonLabel>
            <IonButton className="upload-btn">
              <IonIcon className="upload-icon" slot="icon-only" icon={camera} />
            </IonButton>
          </IonItem>
          {image && (
            <IonImg className="add-img" src={image} onClick={takePicture} />
          )}
        </div>
        <div className="input-container">
          <IonItem className="ion-no-padding">
            <IonLabel position="stacked">The name of your dog</IonLabel>
            <IonInput
              value={dogName}
              type="text"
              onIonChange={(e) => setDogName(e.target.value)}
              required
            />
          </IonItem>
          <IonItem className="ion-no-padding">
            <IonLabel position="stacked">Date and time</IonLabel>
            <IonDatetime
              locale="en-DA"
              hour-cycle="h23"
              minuteValues="0,15,30,45"
              displayFormat="D MMM YYYY H:mm"
              className="ion-no-padding"
              value={time}
              type="text"
              onIonChange={(e) => setTime(e.target.value)}
              required
            />
          </IonItem>
          {/* 
          <IonItem className="ion-no-padding">
            <IonLabel position="stacked">Pick up address</IonLabel>
            <IonInput
              className="ion-no-padding"
              value={address}
              type="text"
              onIonChange={(e) => setAddress(e.target.value)}
              required
            />
          </IonItem> */}
          <IonItem className="ion-no-padding">
            <IonLabel position="stacked" className="add-label">
              Additional information about the dog
            </IonLabel>
            <IonTextarea
              className="add-textarea"
              value={description}
              type="text"
              onIonChange={(e) => setDescription(e.target.value)}
              required
            />
          </IonItem>
        </div>
      </IonList>

      <Select onChange={setAddress} options={options} value={address} />

      <div className="btn-container">
        {dogName && time && address && description ? (
          <IonButton className="save-btn" expand="block">
            Save
          </IonButton>
        ) : (
          <IonButton className="save-btn" type="submit" expand="block" disabled>
            Save
          </IonButton>
        )}
      </div>
    </form>
  );
}
