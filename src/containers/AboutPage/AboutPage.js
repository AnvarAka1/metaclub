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
// import ax from "axios";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
class AboutPage extends Component {
	_isMounted = false;
	mhc = null;
	currencies = [];
	currency1 = null;
	period = [ 1, 7, 30, 365 ];

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
			calcCard: null,
			roi: 0.58
		},
		copied: false,
		serverCards: null,
		loading: true,
		initialUpdate: false
	};
	componentDidMount() {
		this._isMounted = true;
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

		let currency = null;
		axios
			.get("/articles/last3")
			.then(res => {
				if (this._isMounted) {
					// const data = res.data;
					this.setState({ news: res });
				}
			})
			.catch(err => {
				console.log("Error ", err);
			});
		axios
			.get("/servers")
			.then(res => {
				serverCards = res.data;
				return axios.get("/calculator");
			})
			.then(res => {
				if (this._isMounted) {
					this.mhc = +res.data.data.MHC;
					//this.currency(res.data.data);
					currency = res.data.data;
					this.currency1 = currency;
					// axios to get ROI
					const roi = 0.9;

					this.currencies = this.currency(currency);
					for (let i = 0; i < calcCard.length; i++) {
						calcCard[i].currency = this.getProfit(roi, currency, this.period[i]);
					}

					const calculator = {
						...this.state.calculator,
						roi: roi,
						calcCard: calcCard
					};
					console.log(calculator);
					// console.log(calcCard);
					if (this._isMounted) {
						this.setState({
							serverCards: serverCards,
							calculator: calculator,
							loading: false,
							initialUpdate: true
						});
					}
				}
			})
			.catch(err => {
				console.log("Error ", err);
			});
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	componentDidUpdate() {
		if (this.state.copied) {
			setTimeout(() => {
				this.setState({ copied: false });
			}, 3000);
		}
		if (this.state.initialUpdate) {
			console.log("UPD");
			if (!this.state.loading) {
				this.rangeChangeHandler(this.state.calculator.range.value);
			}
			this.setState({ initialUpdate: false });
		}
		console.log(this.state.calculator);
	}

	getProfit = (roi, currency, multiplier) => {
		const currencyArray = this.currency(currency);
		// quantity of MHC
		const numberOfMHC = (1 + 0.0019 * roi) * this.state.calculator.input.value - this.state.calculator.input.value;
		const usd = numberOfMHC * currencyArray[0].value;

		let values = [
			{
				key: currencyArray[0].key,
				value: this.roundUp(numberOfMHC * multiplier, 4)
			},
			{
				key: currencyArray[1].key,
				value: usd / currencyArray[1].value * multiplier
			},
			{
				key: currencyArray[2].key,
				value: usd / currencyArray[2].value * multiplier
			},
			{
				key: currencyArray[3].key,
				value: usd / currencyArray[3].value * multiplier
			}
		];
		// console.log(values);
		return values;
	};

	currency = object => {
		const array = [];
		const keys = [ "MHC", "TUSD", "BTC", "ETH" ];
		for (let i = 0; i < keys.length; i++) {
			array.push({ key: keys[i], value: this.roundUp(object[keys[i]], 4) });
		}
		return array;
	};
	roundUp(num, precision) {
		precision = Math.pow(10, precision);
		return Math.ceil(num * precision) / precision;
	}
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
		let calcCard = this.state.calculator.calcCard.slice();

		let currencies = calcCard.map((el, i) => {
			const values = this.getProfit(this.state.calculator.roi, this.currency1, this.period[i]);
			const currencyElements = el.currency.map((el, index) => {
				return {
					key: el.key,
					value: values[index].value
				};
			});
			return currencyElements;
		});

		const newCalcCard = calcCard.map((el, index) => {
			return { id: el.id, date: el.date, percentage: el.percentage, currency: currencies[index] };
		});
		calculator.calcCard = newCalcCard;

		this.setState({ calculator: calculator });
	};
	inputChangedHandler = event => {
		let value = event.target.value;
		let calculator = { ...this.state.calculator };
		calculator.input = { ...this.state.calculator.input, value: value };
		// let calcCard = this.state.calculator.calcCard.slice();

		// let currencies = calcCard.map((el, i) => {
		// 	const values = this.getProfit(this.state.calculator.roi, this.currency1, this.period[i]);
		// 	console.log(values);
		// 	const currencyElements = el.currency.map((el, index) => {
		// 		return {
		// 			key: el.key,
		// 			value: values[index].value
		// 		};
		// 	});
		// 	return currencyElements;
		// });
		// const newCalcCard = calcCard.map((el, index) => {
		// 	return { id: el.id, date: el.date, percentage: el.percentage, currency: currencies[index] };
		// });
		// calculator.calcCard = newCalcCard;
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
		this.rangeChangeHandler(value);
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
				<NewsItems
					articleClicked={this.articleHandler}
					lang={this.props.lang}
					noPag
					news={this.state.news}
					limit={3}
				/>
			);
			calculator = this.state.calculator && (
				<Calculator
					mhc={this.mhc}
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
				header: [
					"Про #MetaHashCoin, multiPoS майнинг, форженг, стейкинг",
					"About #MetaHashCoin, multiPoS, mining, forging, staking"
				],
				text: [
					"Это клуб для сообщества #MetaHash(MHC), Объединяющий Инвесторов, Программистов, Разработчиков и просто Людей, интересующихся криптовалютной тематикой.",
					"This is a club for the #MetaHash (MHC) community, Bringing together Investors, Programmers, Developers and just People interested in cryptocurrency topics."
				],
				link: [ "Подробнее »", "More details »" ]
			},
			second: {
				header: [ "Что такое", "What is" ],
				text: [
					"это самый быстрый, надежный и децентрализованная криптавалюта в мире. Инвестирую и поддерживая децентрализованная сеть #MetaHash(MHC) вы можете зарабатывать на делигирования и форженге свои монеты.",
					"It is the fastest, most reliable and decentralized cryptocurrency in the world. By investing in and supporting the #MetaHash (MHC) decentralized network, you can earn money by delisting and forging your coins."
				],

				link: [ "Начать зарабатывать »", "Start earning »" ]
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
								<span className="accent">Metaclub</span> - {content.first.header[this.props.lang]}!{" "}
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
						<div id="metahash">
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
						<div id="calculator">{calculator}</div>
					</Grid>
					{/* SERVER CARDS */}
					<Grid item xs={12}>
						<div id="nodes">
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
						<div id="articles">
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
