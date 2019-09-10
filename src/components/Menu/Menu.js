import React from "react";
import Header from "../UI/Header/Header";
import classes from "./Menu.module.css";

const menu = props => {
	const lang = {
		menu: [ "Меню", "Menu" ]
	};
	const menuList = props.menu.map(menu => {
		return (
			<li key={menu.id} className={[ classes.Li ].join(" ")} onClick={event => props.clicked(event, menu.id)}>
				<Header
					h4
					thick={menu.active ? true : null}
					normal={!menu.active ? true : null}
					headerClass={menu.active ? "Accent" : null}
				>
					{menu.name_en}
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
				{lang.menu[0]}
			</Header>
			<ul className={classes.Ul}>{menuList}</ul>
		</React.Fragment>
	);
};

export default menu;
