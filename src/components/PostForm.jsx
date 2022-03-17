import { IonItem, IonInput, IonButton, IonList } from "@ionic/react";
import { useState, useEffect } from "react";
/* import { Camera, CameraResultType } from "@capacitor/camera"; */

export default function PostForm({ post, handleSubmit }) {
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [information, setInformation] = useState("");
  /* const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({}); */

  useEffect(() => {
    if (post) {
      setAddress(post.time);
      setAddress(post.address);
      setInformation(post.information);
      /*setImage(post.image); */
    }
  }, [post]);

  function submitEvent(event) {
    event.preventDefault();
    const formData = {
      time: time,
      address: address,
      information: information /*, image: imageFile*/,
    };
    handleSubmit(formData);
  }

  /*
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
  */

  return (
    <form onSubmit={submitEvent}>
      <IonList>
        <IonItem>
          <IonInput
            value={time}
            placeholder="Date and time"
            onIonChange={(e) => setTime(e.target.value)}
            required
          />
        </IonItem>
        <IonItem>
          <IonInput
            value={address}
            placeholder="Address"
            onIonChange={(e) => setAddress(e.target.value)}
            required
          />
        </IonItem>
        <IonItem>
          <IonInput
            value={information}
            placeholder="Additional information about the dog"
            onIonChange={(e) => setInformation(e.target.value)}
            required
          />
        </IonItem>

        {/* <IonItem onClick={takePicture} lines="none">
          <IonLabel>Choose Image</IonLabel>
          <IonButton>
            <IonIcon slot="icon-only" icon={camera} />
          </IonButton>
        </IonItem>
        {image && (
          <IonImg className="ion-padding" src={image} onClick={takePicture} />
        )} */}

        <div className="ion-padding">
          {time && address && information ? (
            <IonButton expand="block">Save</IonButton>
          ) : (
            <IonButton type="submit" expand="block" disabled>
              Save
            </IonButton>
          )}
        </div>
      </IonList>
    </form>
  );
}
