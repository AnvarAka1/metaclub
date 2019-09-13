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
				value: 0
			},
			calcCard: [
				{
					id: 0,
					date: "В день",
					currency: [
						{ key: "MHC", value: "100 MHC" },
						{ key: "USD", value: "0,120 USD" },
						{ key: "BTC", value: "0,0000001 BTC" },
						{ key: "ETH", value: "0,256 ETH" }
					],
					percentage: "+0.58 %"
				},

				{
					id: 1,
					date: "В неделю",
					currency: [
						{ key: "MHC", value: "100 MHC" },
						{ key: "USD", value: "0,120 USD" },
						{ key: "BTC", value: "0,0000001 BTC" },
						{ key: "ETH", value: "0,256 ETH" }
					],
					percentage: "+0.58 %"
				},
				{
					id: 2,
					date: "В месяц",
					currency: [
						{ key: "MHC", value: "100 MHC" },
						{ key: "USD", value: "0,120 USD" },
						{ key: "BTC", value: "0,0000001 BTC" },
						{ key: "ETH", value: "0,256 ETH" }
					],
					percentage: "+0.58 %"
				},
				{
					id: 3,
					date: "В год",
					currency: [
						{ key: "MHC", value: "100 MHC" },
						{ key: "USD", value: "0,120 USD" },
						{ key: "BTC", value: "0,0000001 BTC" },
						{ key: "ETH", value: "0,256 ETH" }
					],
					percentage: "+0.58 %"
				}
			]
		},
		copied: false,
		serverCards: null,
		loading: true
	};
	componentDidMount() {
		axios
			.get("/articles")
			.then(res => {
				const data = res.data.data;
				this.setState({ news: data });
			})
			.catch(err => {
				console.log("Error ", err);
			});
		axios
			.get("/servers")
			.then(res => {
				this.setState({ serverCards: res.data, loading: false });
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
	rangeChangeHandlerTest = event => {
		const value = event.target.value;
		const calculator = { ...this.state.calculator };
		calculator.range = { ...this.state.calculator.range, value: value };
		this.setState({ calculator: calculator });
	};
	rangeChangeHandler = value => {
		const calculator = { ...this.state.calculator };
		calculator.range = { ...this.state.calculator.range, value: value };
		this.setState({ calculator: calculator });
	};
	inputChangedHandler = event => {
		const value = event.target.value;
		const calculator = { ...this.state.calculator };
		calculator.input = { ...this.state.calculator.input, value: value };
		this.setState({ calculator: calculator });
	};
	buttonClickedHandler = event => {
		event.preventDefault();
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
		if (!this.state.loading) {
			serverCards = this.state.serverCards && (
				<ServerCards lang={this.props.lang} serverCards={this.state.serverCards} copied={this.copyHandler} />
			);
			news = this.state.news && (
				<NewsItems articleClicked={this.articleHandler} news={this.state.news} limit={3} />
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
						<Calculator
							lang={this.props.lang}
							calc={this.state.calculator}
							inputChanged={this.inputChangedHandler}
							rangeChanged={this.rangeChangeHandler}
							buttonCClicked={this.buttonClickedHandler}
						/>
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
