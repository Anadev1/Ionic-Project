import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonListHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostListItem from "../components/PostCard";
import UserCard from "../components/UserCard";
import { getUserRef, postsRef } from "../firebase-config";
import { onValue, query, orderByChild, equalTo, get } from "firebase/database";

export default function UserPage() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    async function getUserDataOnce() {
      const snapshot = await get(getUserRef(userId));
      const userData = snapshot.val();
      setUser({
        id: userId,
        ...userData,
      });
      return userData;
    }

    async function listenOnChange() {
      const postsByUserId = query(
        postsRef,
        orderByChild("uid"),
        equalTo(userId)
      );
      const userData = await getUserDataOnce();

      onValue(postsByUserId, async (snapshot) => {
        const postsArray = [];
        snapshot.forEach((postSnapshot) => {
          const id = postSnapshot.key;
          const data = postSnapshot.val();
          const post = {
            id,
            ...data,
            user: userData,
          };
          postsArray.push(post);
        });
        setPosts(postsArray.reverse());
      });
    }

    listenOnChange();
  }, [userId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="topbar">
          <IonButtons slot="start">
            <IonBackButton className="back-btn" text="" defaultHref="home" />
          </IonButtons>
          <h1 className="topbar-title">
            {user?.name ? user.name : "Unknown User Name"}
          </h1>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <UserCard user={user} />

        <IonListHeader>
          <IonLabel>{posts.length ? "Users Posts" : "No posts yet"}</IonLabel>
        </IonListHeader>
        {posts.map((post) => (
          <PostListItem post={post} key={post.id} />
        ))}
      </IonContent>
    </IonPage>
  );
}
