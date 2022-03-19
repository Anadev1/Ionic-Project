import { IonItem, IonInput, IonImg, IonButton, IonList } from "@ionic/react";
import { useState, useEffect } from "react";
/* import { Camera, CameraResultType } from "@capacitor/camera"; */

export default function DogForm({ dog, handleSubmit }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  /* const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({}); */

  useEffect(() => {
    if (dog) {
      setName(dog.name);
      setAge(dog.age);
      setBreed(dog.breed);
      setAdditionalInfo(dog.additionalInfo);
      /*setImage(user.image); */
    }
  }, [dog]);

  function submitEvent(event) {
    event.preventDefault();
    const formData = {
      name: name,
      age: age,
      breed: breed,
      additionalInfo: additionalInfo /*, image: imageFile*/,
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
      <IonImg src="assets/dog-photo-placeholder.png" className="dog-photo" />
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
          {name && age && breed && additionalInfo ? (
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
