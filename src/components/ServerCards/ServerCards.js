import React from "react";
import ServerCard from "./ServerCard/ServerCard";

const serverCards = props => {
	const serverCards = props.serverCards.map(serverCard => {
		return (
			<ServerCard
			lang={props.lang}
				key={serverCard.id}
				serverCard={serverCard}
        copied={props.copied}
        
			/>
		);
	});
	return <>{serverCards}</>;
};

export default serverCards;
