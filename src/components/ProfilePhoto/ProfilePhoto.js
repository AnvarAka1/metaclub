import React from "react";
import classes from "./ProfilePhoto.module.css";
const ProfilePhoto = props => {
	const profilePhotoClasses = [ classes.ProfilePhoto, props.max && classes.Max ];
	return (
		<div className={profilePhotoClasses.join(" ")}>
			<img onClick={props.clicked} src={props.src} alt={props.alt} />
		</div>
	);
};

export default ProfilePhoto;
