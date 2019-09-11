import React from "react";
import classes from "./NavigationItems.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";

import SinIcon from "../../../assets/images/icons/signin.png";
import Hidden from "@material-ui/core/Hidden";
// import Logo from "../../../assets/images/logo.png";
import NavigationItem from "./NavigationItem/NavigationItem";
import Button from "../../UI/Button/Button";
import LangSelect from "../../LangSelect/LangSelect";
import Hamburger from "../../UI/Hamburger/Hamburger";
import Grid from "../../Grid/Grid";
import Header from "../../UI/Header/Header";
const navigationItems = props => {
	const navItems = languageSelect(props);
	const navigationItems = navItems.nav.map(navItem => {
		return (
			<NavigationItem
				drawerClosed={props.drawerClosed}
				key={navItem.title}
				vertical={props.vertical}
				link={navItem.link}
			>
				{navItem.title}
			</NavigationItem>
		);
	});
	const button = props.isAuthorized ? (
		<React.Fragment>
			<NavLink to="/settings">
				<Button
					key={navItems.button[1].title}
					{...navItems.button[1].type}
					clicked={navItems.button[1].clicked}
				>
					<img src={navItems.button[1].icon} alt={navItems.button[1].title} />
					{navItems.button[1].title}
				</Button>
			</NavLink>

			<Header
				normal
				color="#333"
				clicked={props.logout}
				h6
				headerStyle={{ marginRight: "10px", cursor: "pointer" }}
			>
				Выйти
			</Header>
		</React.Fragment>
	) : (
		<Button key={navItems.button[0].title} {...navItems.button[0].type} clicked={navItems.button[0].clicked}>
			<img src={navItems.button[0].icon} alt={navItems.button[0].title} />
			{navItems.button[0].title}
		</Button>
	);

	const logo = (
		<li>
			<NavLink to="/">
				<Logo vertical={props.vertical && props.vertical} />
			</NavLink>
		</li>
	);

	const rightNav = props.vertical ? null : (
		<li className={classes.Buttons}>
			{button}
			{/* Language selector */}
			<LangSelect lang={props.lang} langClicked={props.langClicked} />
			<Hidden mdUp>
				<Hamburger clicked={props.drawerOpened} />
			</Hidden>
		</li>
	);

	return (
		<nav>
			<div className={props.vertical ? classes.VerticalAppBar : classes.AppBar}>
				<Grid con={props.vertical ? null : "true"} container justify="center">
					<ul className={props.vertical ? classes.VerticalNavigationItems : classes.NavigationItems}>
						{/* Logo */}
						{logo}
						{/* navigation */}
						{navigationItems}
						{/* SideDrawer Navigation */}

						{/* Sign In and Reg */}
						{rightNav}
					</ul>
				</Grid>
			</div>
		</nav>
	);
};

// Function gets props, verifies the language selected(state in App.js) and then selects the titles
// for navigation buttons and also for 2 buttons: Sign In and Register
/**@return array with all elements in navigation items in selected language */

const languageSelect = props => {
	const navItemsMulti = {
		nav: [
			{
				title: [ "О проекте", "About Project", "UzAbout Project" ],
				link: "/about"
			},
			{
				title: [ "Как зарабатывать?", "How to get paid?", "UzHow to get paid" ],
				link: "/mhc"
			},
			{
				title: [ "Калькулятор", "Calculator", "UzUzCalculator" ],
				link: "/calculator"
			},
			{ title: [ "Ноды", "Nodes", "UzNodes" ], link: "/nodes" },
			{ title: [ "Статьи", "Articles", "UzArticles" ], link: "/articles" },
			{ title: [ "F.A.Q", "F.A.Q", "UzF.A.Q" ], link: "/faq" },
			{ title: [ "Контакты", "Contacts", "UzContacts" ], link: "/contacts" }
		],
		buttons: [
			{
				title: [ "Войти", "Sign In" ],
				type: { round: true, white: true },
				icon: SinIcon,
				clicked: props.signInClicked
			},
			{
				title: [ "Профиль", "Profile" ],
				type: { round: true, white: true },
				icon: SinIcon,
				clicked: props.profileClicked
			}
		]
	};
	const navItems = {};
	navItems.button = navItemsMulti.buttons.map(button => {
		return {
			title: button.title[props.lang],
			type: button.type,
			icon: button.icon,
			clicked: button.clicked
		};
	});
	navItems.nav = navItemsMulti.nav.map(navItemMulti => {
		return { title: navItemMulti.title[props.lang], link: navItemMulti.link };
	});
	return navItems;
};
export default navigationItems;
