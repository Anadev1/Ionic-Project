import {
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/react";
import { useState, useEffect } from "react";

export default function CommentForm({ comment, handleSubmit }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (comment) {
      setMessage(comment.message);
    }
  }, [comment]);

  function submitEvent(event) {
    event.preventDefault();
    const formData = {
      message: message,
    };
    handleSubmit(formData);
  }

  return (
    <form onSubmit={submitEvent}>
      <div className="comment-container">
        <IonItem className="ion-no-padding">
          <IonInput
            value={message}
            type="text"
            placeholder="Write a comment..."
            onIonChange={(e) => setMessage(e.target.value)}
            required
          />
        </IonItem>

        <div>
          {message ? (
            <IonButton className="comment-btn" fill="clear" expand="block">
              Save
            </IonButton>
          ) : (
            <IonButton
              className="comment-btn"
              type="submit"
              fill="clear"
              expand="block"
              disabled
            >
              Save
            </IonButton>
          )}
        </div>
      </div>
    </form>
  );
}
