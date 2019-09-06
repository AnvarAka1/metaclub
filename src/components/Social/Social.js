import React from "react";

import classes from "./Social.module.css";
import TgIcon from "../../assets/images/icons/telegram.png";
import FbIcon from "../../assets/images/icons/facebook.png";
import YtIcon from "../../assets/images/icons/youtube.png";
import MsgIcon from "../../assets/images/icons/message.png";
const social = props => {
	const socialLinks = [
		{
			title: "Telegram",
			icon: TgIcon,
			link: "/telegram"
		},
		{
			title: "Facebook",
			icon: FbIcon,
			link: "/facebook"
		},
		{
			title: "Youtube",
			icon: YtIcon,
			link: "https://youtube.com"
		},
		{
			title: "G-Mail",
			icon: MsgIcon,
			link: "https://gmail.com"
		}
	];
	const socials = socialLinks.map(socialLink => {
		return (
			<a key={socialLink.title} href={socialLink.link} target="_blank" rel="noopener noreferrer">
				<img src={socialLink.icon} alt={socialLink.title} />
			</a>
		);
	});
	return (
		<div className={classes.Social}>
			<div className={classes.Links}>{socials}</div>
		</div>
	);
};

export default social;
