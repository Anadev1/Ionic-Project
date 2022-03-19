import { IonItem, IonInput, IonButton, IonList, IonLabel, IonIcon, IonImg, IonTextarea} from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";

export default function PostForm({ post, handleSubmit }) {
  const [dogName, setDogName] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
   const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({}); 
  console.log(image);
  console.log(setImageFile);

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
      address: address,
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
            <IonInput
              className="ion-no-padding"
              value={time}
              type="text"
              onIonChange={(e) => setTime(e.target.value)}
              required
            />
          </IonItem>

          <IonItem className="ion-no-padding">
            <IonLabel position="stacked">Pick up address</IonLabel>
            <IonInput
              className="ion-no-padding"
              value={address}
              type="text"
              onIonChange={(e) => setAddress(e.target.value)}
              required
            />
          </IonItem>
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

        <div className="btn-container">
          {dogName && time && address && description ? (
            <IonButton className="save-btn" expand="block">
              Save
            </IonButton>
          ) : (
            <IonButton
              className="save-btn"
              type="submit"
              expand="block"
              disabled
            >
              Save
            </IonButton>
          )}
        </div>
      </IonList>
    </form>
  );
}
