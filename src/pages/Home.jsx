import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonList
} from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import PostListItem from "../components/PostCard";
import { postsRef, usersRef } from "../firebase-config";
import { onValue, get } from "firebase/database";

export default function Home() {
  const history = useHistory();
   const [posts, setPosts] = useState([]);

    async function getUsers() {
        const snapshot = await get(usersRef);
        const usersArray = [];
        snapshot.forEach(postSnapshot => {
            const id = postSnapshot.key;
            const data = postSnapshot.val();
            const post = {
                id,
                ...data
            };
            usersArray.push(post);
        });

        return usersArray;
    }

    useEffect(() => {
        async function listenOnChange() {
            onValue(postsRef, async snapshot => {
                const users = await getUsers();
                const postsArray = [];
                snapshot.forEach(postSnapshot => {
                    const id = postSnapshot.key;
                    const data = postSnapshot.val();
                    const post = {
                        id,
                        ...data,
                        user: users.find(user => user.id == data.uid)
                    };
                    postsArray.push(post);
                });
                setPosts(postsArray.reverse());
            });
        }
        listenOnChange();
    }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {posts.map((post) => (
            <PostListItem post={post} key={post.id} />
          ))}
        </IonList>

        <div>
          <IonText
            class="login-btn"
            onClick={() => history.replace("/usersetup")}
          >
            User set up
          </IonText>
          <br></br>
          <IonText
            class="login-btn"
            onClick={() => history.replace("/dogsetup")}
          >
            Dog set up
          </IonText>
          <br></br>
          <IonText
            class="login-btn"
            onClick={() => history.replace("/onboarding1")}
          >
            Onboarding
          </IonText>
          <br></br>
          <IonText class="login-btn" onClick={() => history.replace("/next")}>
            Next
          </IonText>
          <br></br>
          <IonText class="login-btn" onClick={() => history.replace("/splash")}>
            Splash
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
}
