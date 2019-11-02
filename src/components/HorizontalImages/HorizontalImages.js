import React from "react";
import classes from "./HorizontalImages.module.css";
import firstImage from "../../assets/images/about/horizontal/first.png";
import secondImage from "../../assets/images/about/horizontal/second.png";
import thirdImage from "../../assets/images/about/horizontal/third.png";
import fourthImage from "../../assets/images/about/horizontal/fourth.png";
import fifthImage from "../../assets/images/about/horizontal/fifth.png";

const horizontalImages = props => {
	return (
		<div className={classes.HorizontalImages}>
			<a href="https://bitmax.io/#/register?inviteCode=JVFHGXRI" target="_blank" rel="noopener noreferrer">
				<img src={firstImage} alt="Bitmax" />
			</a>
			<a href="https://coinmarketcap.com/currencies/metahash/" target="_blank" rel="noopener noreferrer">
				<img src={secondImage} alt="CoinMarketCap" />
			</a>
			<a href="https://cex.io/" target="_blank" rel="noopener noreferrer">
				<img src={thirdImage} alt="CexIO" />
			</a>
			<a
				href="https://www.coingecko.com/en/coins/metahash?utm_content=metahash&utm_medium=search_coin&utm_source=coingecko"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={fourthImage} alt="CoinGeko" />
			</a>
			<a href="https://www.kucoin.com/?rcode=v5RvRa" target="_blank" rel="noopener noreferrer">
				<img src={fifthImage} alt="KuCoin" />
			</a>
		</div>
	);
};

export default horizontalImages;
