import React from "react";
// import classes from "./NewsItems.module.css";
import NewsItem from "./NewsItem/NewsItem";
import Grid from "../Grid/Grid";
import Pages from "../Pages/Pages";

const newsItems = props => {
	const news =
		props.news &&
		props.news.data.map(newsItem => {
			return (
				<Grid key={newsItem.id} item xs={12} sm={props.wide ? 12 : props.half ? 6 : 4} md={props.wide ? 12 : 4}>
					<NewsItem
						lang={props.lang}
						editable={props.editable}
						clicked={props.articleClicked && (event => props.articleClicked(event, newsItem.id))}
						editClicked={props.editClicked && (event => props.editClicked(event, newsItem.id))}
						removeClicked={props.removeClicked && (event => props.removeClicked(event, newsItem.id))}
						key={newsItem.id}
						{...newsItem}
					/>
				</Grid>
			);
		});
	return (
		<React.Fragment>
			{news}

			{!props.noPag ? (
				<Grid item xs={12}>
					<Pages clicked={props.pageClicked} {...props.news} />
				</Grid>
			) : null}
		</React.Fragment>
	);
};

export default newsItems;
