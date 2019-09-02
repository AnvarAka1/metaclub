import React from "react";
import classes from "./ProfilePhoto.module.css";
const ProfilePhoto = props => {
  const profilePhotoClasses = [classes.ProfilePhoto];
  return (
    <div className={profilePhotoClasses.join(" ")}>
      <img onClick={props.clicked} src={props.src} alt={props.alt}></img>
    </div>
  );
};

export default ProfilePhoto;
