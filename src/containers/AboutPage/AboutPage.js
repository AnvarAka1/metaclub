import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/UI/Header/Header";
import Grid from "../../components/Grid/Grid";
import Button from "../../components/UI/Button/Button";
import FirstImage from "../../assets/images/about/first.png";
import SecondImage from "../../assets/images/about/second.png";
import HorizontalImages from "../../components/HorizontalImages/HorizontalImages";
import Text from "../../components/UI/Text/Text";
import ServerCards from "../../components/ServerCards/ServerCards";
import Calculator from "../../components/Calculator/Calculator";
import NewsItems from "../../components/NewsItems/NewsItems";
import Hidden from "@material-ui/core/Hidden";
import CopiedText from "../../components/CopiedText/CopiedText";
import axios from "../../axios-db";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
class AboutPage extends Component {
	state = {
		news: null,
		calculator: {
			range: {
				inputType: "range",
				config: {
					type: "range"
				},
				value: 512
			},
			input: {
				inputType: "input",
				inputClass: "Accent",
				config: {
					type: "text"
				},
				value: 512
			},
			calcCard: null
		},
		copied: false,
		serverCards: null,
		loading: true
	};
	componentDidMount() {
		let calcCard = [
			{
				id: 0,
				date: [ "В день", "Daily" ],
				currency: null,
				percentage: "+0.58 %"
			},

			{
				id: 1,
				date: [ "В неделю", "Weekly" ],
				currency: null,
				percentage: "+0.58 %"
			},
			{
				id: 2,
				date: [ "В месяц", "Monthly" ],
				currency: null,
				percentage: "+0.58 %"
			},
			{
				id: 3,
				date: [ "В год", "Annually" ],
				currency: null,
				percentage: "+0.58 %"
			}
		];
		let serverCards;
		axios
			.get("/articles/last3")
			.then(res => {
				const data = res;
				this.setState({ news: data });
			})
			.catch(err => {
				console.log("Error ", err);
			});
		axios
			.get("/servers")
			.then(res => {
				serverCards = res.data;
				return axios.get("https://api.kucoin.com/api/v1/prices");
			})
			.then(res => {
				console.log(res.data.data);
				this.currency(res.data.data);
				console.log(this.currency(res.data.data));
				for (let i = 0; i < calcCard.length; i++) {
					calcCard[i].currency = this.currency(res.data.data);
				}
				console.log(calcCard);
				const calculator = {
					...this.state.calculator,
					calcCard: calcCard
				};
				this.setState({ serverCards: serverCards, calculator: calculator, loading: false });
			})
			.catch(err => {
				console.log("Error ", err);
			});
	}
	componentDidUpdate() {
		if (this.state.copied) {
			setTimeout(() => {
				this.setState({ copied: false });
			}, 3000);
		}
	}
	currency = object => {
		const array = [];
		const keys = [ "MHC", "TUSD", "BTC", "ETH" ];
		for (let i = 0; i < keys.length; i++) {
			array.push({ key: keys[i], value: object[keys[i]] });
		}
		return array;
	};
	rangeChangeHandlerTest = event => {
		const value = event.target.value;
		const calculator = { ...this.state.calculator };
		calculator.range = { ...this.state.calculator.range, value: value };
		this.setState({ calculator: calculator });
	};
	rangeChangeHandler = value => {
		let calculator = { ...this.state.calculator };
		calculator.range = { ...this.state.calculator.range, value: value };
		calculator.input = { ...this.state.calculator.input, value: value };
		this.setState({ calculator: calculator });
	};
	inputChangedHandler = event => {
		let value = event.target.value;
		// value = value < 512 ? 512 : value;
		// value = value > 1000000 ? 1000000 : value;
		let calculator = { ...this.state.calculator };
		calculator.input = { ...this.state.calculator.input, value: value };

		this.setState({ calculator: calculator });
	};
	buttonClickedHandler = event => {
		event.preventDefault();

		let value = this.state.calculator.input.value;
		value = this.state.calculator.input.value > 1000000 ? 1000000 : this.state.calculator.input.value;
		value = this.state.calculator.input.value < 512 ? 512 : this.state.calculator.input.value;
		let calculator = { ...this.state.calculator };
		calculator.range = { ...this.state.calculator.range, value: +value };
		calculator.input = { ...this.state.calculator.input, value: +value };
		this.setState({ calculator: calculator });
		// const value = this.state.calculator.input.value;
	};
	articleHandler = (event, id) => {
		event.preventDefault();
		this.props.history.push(`/articles/${id}`);
		window.scrollTo({ top: "0" });
	};
	copyHandler = () => {
		this.setState({ copied: true });
	};

	render() {
		let serverCards = <Spinner />;
		let news = <Spinner />;
		let calculator = <Spinner />;
		if (!this.state.loading) {
			serverCards = this.state.serverCards && (
				<ServerCards lang={this.props.lang} serverCards={this.state.serverCards} copied={this.copyHandler} />
			);
			news = this.state.news && (
				<NewsItems articleClicked={this.articleHandler} noPag news={this.state.news} limit={3} />
			);
			calculator = this.state.calculator && (
				<Calculator
					lang={this.props.lang}
					calc={this.state.calculator}
					inputChanged={this.inputChangedHandler}
					rangeChanged={this.rangeChangeHandler}
					buttonClicked={this.buttonClickedHandler}
				/>
			);
		}
		const content = {
			first: {
				header: [ "Революционер на криптовалютной отрасли", "Cryptocurrency Revolutionary" ],
				text: [
					"Это клуб для сообществу #MetaHash(MHC), Объединяющий Инвесторов, Программистов, Разработчиков и просто людей интересующей криптовалютный тематики.",
					"This is a club for the #MetaHash (MHC) community, bringing together Investors, Programmers, Developers and just people interested in cryptocurrency topics."
				],
				link: [ "Подробнее »", "More details »" ]
			},
			second: {
				header: [ "Что такое", "What is" ],
				text: [
					"это самый быстрый, надежный и децентрализованная криптавалюта в мире. Инвестирую и поддерживая децентрализованная сеть #MetaHash(MHC) вы можете зарабатывать на делигирования и форженге свои монеты.",
					"It is the fastest, most reliable and decentralized cryptocurrency in the world. By investing in and supporting the #MetaHash (MHC) decentralized network, you can earn money by delisting and forging your coins."
				],

				link: [ "Подробнее »", "More details »" ]
			},
			third: {
				header: [ "Статистика серверов", "Server statistics" ]
			},
			fourth: {
				header: [ "Новости / Медиа", "News / Media" ],
				link: [ "Больше новостей", "More news" ]
			}
		};
		return (
			<React.Fragment>
				<Grid con="true" container spacing={3}>
					<Grid item sm={7}>
						<div>
							<Header h1>
								Blockchain <span className="accent">4.0</span>
							</Header>
							<Header h2 thin mtb>
								<span className="accent">#MetaHash(MHC)</span> - {content.first.header[this.props.lang]}!{" "}
							</Header>
							<Text mbBig part>
								MetaClub - {content.first.text[this.props.lang]}{" "}
							</Text>
							<NavLink to="/mhc">
								<Button white round>
									{content.first.link[this.props.lang]}
								</Button>
							</NavLink>
						</div>
					</Grid>
					<Grid item sm={5}>
						<img src={FirstImage} alt="Blockchain" />
					</Grid>
					<Grid item sm={12}>
						<HorizontalImages />
					</Grid>
					<Grid item sm={1} />
					<Grid item sm={5}>
						<img src={SecondImage} alt="Metahash" />
					</Grid>
					<Grid item sm={5}>
						<div>
							<Header h4 hasLine mb>
								{content.second.header[this.props.lang]} <span className="accent">#MetaHash?</span>
							</Header>
							<Text mtb>
								<span>#MetaHash</span> - {content.second.text[this.props.lang]}
							</Text>
							<Header h5>
								<NavLink to="/mhc">
									<span className="accent">{content.second.link[this.props.lang]}</span>
								</NavLink>
							</Header>
						</div>
					</Grid>
					<Grid item xs={12}>
						{calculator}
					</Grid>
					{/* SERVER CARDS */}
					<Grid item xs={12}>
						<div>
							<Header center normal h3 mtb>
								{content.third.header[this.props.lang]}
							</Header>
						</div>
					</Grid>
					<Hidden smDown>
						<Grid item xs={1} />
					</Hidden>
					<Grid item md={10} sm={12} xs={12}>
						{serverCards}
					</Grid>
					{/* NEWS */}
					<Grid item xs={12}>
						<div id="news">
							<Header center h3 normal mtb>
								{content.fourth.header[this.props.lang]}
							</Header>
						</div>
					</Grid>
					{news}
					<div style={{ textAlign: "center", width: "100%" }}>
						<NavLink to="/articles">
							<Button big grey buttonStyle={{ marginTop: "30px" }}>
								{content.fourth.link[this.props.lang]}
							</Button>
						</NavLink>
					</div>
				</Grid>
				<CopiedText view={this.state.copied} />
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {
		lang: state.lang.lang
	};
};

export default connect(mapStateToProps)(AboutPage);
