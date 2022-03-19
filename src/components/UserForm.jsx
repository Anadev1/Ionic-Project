import {
  IonItem,
  IonInput,
  IonImg,
  IonButton,
  IonIcon,
  IonList,
  IonLabel
} from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { addCircleOutline, camera } from "ionicons/icons";


export default function UserForm({ user, handleSubmit }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({}); 

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAddress(user.address);
      setCity(user.city);
      setImage(user.image);
    }
  }, [user]);

  function submitEvent(event) {
    event.preventDefault();
      const formData = { name: name, address: address, city: city, image: imageFile };
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
      <IonImg src="assets/user-photo-placeholder.png" className="user-photo" />
      <IonList>
        <IonItem>
          <IonInput
            value={name}
            placeholder="Name"
            onIonChange={(e) => setName(e.target.value)}
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
            value={city}
            placeholder="City"
            onIonChange={(e) => setCity(e.target.value)}
            required
          />
        </IonItem>
        <div className="dog-container"> 
          <h4 className="dog-title">My Dog(s)</h4>
          <IonIcon 
          className="add-btn"
          icon={addCircleOutline} />
        </div>

        <IonItem onClick={takePicture} lines="none">
          <IonLabel>Choose Image</IonLabel>
          <IonButton>
            <IonIcon slot="icon-only" icon={camera} />
          </IonButton>
        </IonItem>
        {image && (
          <IonImg className="ion-padding" src={image} onClick={takePicture} />
        )} 

        <div className="ion-padding">
          {name && address && city ? (
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
