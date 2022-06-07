import { IonItem, IonInput, IonButton, IonList, IonLabel, IonIcon, IonImg, IonTextarea, IonDatetime} from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";
import DogListItem from "../components/DogCard";
import {dogsRef } from "../firebase-config";
import { onValue } from "@firebase/database";
import { getAuth } from "firebase/auth";

export default function PostForm({ post, handleSubmit }) {
  const [dogName, setDogName] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [age,setAge]=useState("");
  const [breed,setBreed]=useState("");
  const [dogs, setDogs] = useState([]);
  const [user, setUser] = useState({});
  const auth = getAuth();

  useEffect(() => {
    if (post) {
      setDogName(post.dogName);
      setTime(post.time);
      setAddress(post.address);
      setDescription(post.description);
      setImage(post.image); 
      setAge(post.age);
      setBreed(post.breed);
    }
    setUser(auth.currentUser);
    async function listenOnChange() {
      onValue(dogsRef, async (snapshot) => {
        // const users = await getUsers();
        const dogsArray = [];
        snapshot.forEach((dogSnapshot) => {
          const id = dogSnapshot.key;
          const data = dogSnapshot.val();
          const dog = {
            id,
            ...data,
          };
          if (user.uid === dog.id) {
            dogsArray.push(dog);
          }
        });
        setDogs(dogsArray.reverse());
      });
    }
    listenOnChange();
  }, [post,auth.currentUser, user]);

  function submitEvent(event) {
    event.preventDefault();
    const formData = {
      dogName: dogName,
      time: time,
      address: address,
      description: description,
      image: image,
      age: age,
      breed: breed
    };
    handleSubmit(formData);
  }

  
  /* async function takePicture() {
    const imageOptions = {
      quality: 80,
      width: 500,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    };
    const image = await Camera.getPhoto(imageOptions);
    setImageFile(image);
    setImage(image.dataUrl);
  } */


  return (
    <>
      <div className="header-container">
        <h3>Who's going on a walk today?</h3>
          <h4 className="dogs-container-title">My Dog(s)</h4>
          <IonList className="ion-no-padding dogs-container">
            {dogs.map((dog) => (
               <DogListItem dog={dog} onClick={()=>{
                 setDogName(dog.name);
                 setImage(dog.image);
                 setAge(dog.age);
                 setBreed(dog.breed);
                 setDescription(dog.additionalInfo);
               }}/>
            ))}
          </IonList>
        </div>
        <form onSubmit={submitEvent}>
      <IonList>
        <div className="camera-container">
        
          {image && (
            <IonImg className="add-img" src={image} />
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
            <IonLabel position="stacked">Age</IonLabel>
            <IonInput
              className="ion-no-padding"
              value={age}
              type="text"
              onIonChange={(e) => setAge(e.target.value)}
              required
            />
          </IonItem>
          <IonItem className="ion-no-padding">
            <IonLabel position="stacked">Breed</IonLabel>
            <IonInput
              className="ion-no-padding"
              value={breed}
              type="text"
              onIonChange={(e) => setBreed(e.target.value)}
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
    </>
  );
}
