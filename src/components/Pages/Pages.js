import React from "react";
import classes from "./Pages.module.css";
import Page from "./Page/Page";
import LPIcon from "../../assets/images/icons/first.png";
import FPIcon from "../../assets/images/icons/last.png";

const pages = props => {
	const pagesToDisplay = 3;
	const pagesArray = [];
	for (
		let i = props.current_page > 1 ? props.current_page - 1 : props.current_page;
		i < Math.min(props.last_page + 1, props.current_page + pagesToDisplay);
		i++
	) {
		pagesArray.push({
			number: i,
			selected: props.current_page === i ? true : false
		});
	}

	const pages = pagesArray.map(page => {
		return (
			<Page key={page.number} selected={page.selected} clicked={event => props.clicked(event, page.number)}>
				{page.number}
			</Page>
		);
	});
	return (
		<div className={classes.PagesWrapper}>
			<div className={classes.Pages}>
				<Page clicked={event => props.clicked(event, 1)}>
					<img src={FPIcon} alt="First page" />
				</Page>
				{pages}
				<Page clicked={event => props.clicked(event, props.last_page)}>
					<img src={LPIcon} alt="Last page" />
				</Page>
			</div>
		</div>
	);
};

export default pages;
