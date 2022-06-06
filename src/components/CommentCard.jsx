import {
  IonCard,
  IonImg,
  IonItem,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import placeholder from "../images/placeholder.jpg";
import { useHistory } from "react-router";

export default function CommentListItem({ comment, post }) {

  const history = useHistory();

  function goToUserDetailView() {
    history.push(`users/${comment.uid}`);
  }

  return (
    <IonCard>
      <IonItem lines="none">
        <IonAvatar slot="start" onClick={goToUserDetailView}>
          <IonImg src={post.user?.image ? post.user.image : placeholder} />
        </IonAvatar>
        <IonLabel onClick={goToUserDetailView}>
          <h2>{post.user?.name ? post.user.name : "Unknown User Name"}</h2>
        </IonLabel>
      </IonItem>

      <p></p>
    </IonCard>
  );
}
