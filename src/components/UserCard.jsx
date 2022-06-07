import {
  IonImg,
  IonIcon
} from "@ionic/react";
import placeholder from "../images/placeholder.jpg";
import { locationSharp } from "ionicons/icons";

export default function UserCard({ user }) {
  return (
    <div className="user-container">
      <div className="img-container">
        <IonImg
          className="user-img"
          src={user?.image ? user.image : placeholder}
        />
      </div>
      <div className="user-info-text">
        <h3>{user?.name ? user.name : "Unknown Name"}</h3>

        <div className="location-container">
          <IonIcon className="location-icon" icon={locationSharp} />
          <p>{user?.location ? user.location : "Unknown location"}</p>
        </div>
      </div>
    </div>
  );
}
