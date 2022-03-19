import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonList
} from "@ionic/react";
import "./Home.css";
import { useState, useEffect } from "react";
import PostListItem from "../components/PostCard";
import { postsRef, usersRef } from "../firebase-config";
import { onValue, get } from "firebase/database";

export default function Home() {
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
        <IonToolbar className="topbar">
          <h1 className="topbar-title">Home</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="card-container">
          <IonList className="ion-no-padding">
            {posts.map((post) => (
              <PostListItem post={post} key={post.id} />
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}
