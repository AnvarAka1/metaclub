import React from "react";
import classes from "./NavigationItems.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";
import PrlIcon from "../../../assets/images/icons/profile.png";
import SinIcon from "../../../assets/images/icons/signin.png";
import Hidden from "@material-ui/core/Hidden";
// import Logo from "../../../assets/images/logo.png";
import NavigationItem from "./NavigationItem/NavigationItem";
import Button from "../../UI/Button/Button";
import LangSelect from "../../LangSelect/LangSelect";
import Hamburger from "../../UI/Hamburger/Hamburger";
import Grid from "../../Grid/Grid";
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

	const buttons = navItems.buttons.map(button => {
		return (
			<Button key={button.title} {...button.type} clicked={button.clicked}>
				<img src={button.icon} alt={button.title} />
				{button.title}
			</Button>
		);
	});
	const logo = props.vertical ? null : (
		<li>
			<NavLink to="/">
				<Logo />
			</NavLink>
		</li>
	);
	const rightNav = props.vertical ? null : (
		<li className={classes.Buttons}>
			{buttons}
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
				link: "/about/news"
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
				title: [ "Войти", "Sign In", "UzSign In" ],
				type: { round: true, white: true },
				icon: SinIcon,
				clicked: props.signInClicked
			},
			{
				title: [ "Регистрация", "Register", "UzRegister" ],
				icon: PrlIcon,
				type: { round: true },
				clicked: props.signUpClicked
			}
		]
	};
	const navItems = {};
	navItems.buttons = navItemsMulti.buttons.map(button => {
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
