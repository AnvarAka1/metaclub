import React from "react";
import Header from "../UI/Header/Header";
import classes from "./Menu.module.css";

const menu = props => {
	const content = {
		menu: [ "Меню", "Menu" ]
	};
	const { lang } = props;

	const menuList = props.menu.map(menu => {
		return (
			<li key={menu.id} className={[ classes.Li ].join(" ")} onClick={event => props.clicked(event, menu.id)}>
				<Header
					h4
					thick={menu.active ? true : null}
					normal={!menu.active ? true : null}
					headerClass={menu.active ? "Accent" : null}
				>
					{lang ? menu.name_en : menu.name_ru}
				</Header>
				<Header h4 thick={menu.active ? true : null} normal={!menu.active ? true : null}>
					{menu.count}
				</Header>
			</li>
		);
	});
	return (
		<React.Fragment>
			<Header h3 normal mbBig>
				{content.menu[lang]}
			</Header>
			<ul className={classes.Ul}>{menuList}</ul>
		</React.Fragment>
	);
};

export default menu;
