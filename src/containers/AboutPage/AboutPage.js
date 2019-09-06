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
import Photo from "../../assets/images/news/news.png";
import Hidden from "@material-ui/core/Hidden";
class AboutPage extends Component {
	state = {
		news: [
			{
				id: 0,
				image: Photo,
				title: "Community - Blockchain.io Ambassador Program",
				date: "31 August 2019",
				views: 27,
				comments: 27,
				catId: 1
			},
			{
				id: 1,
				image: Photo,
				title: "Community",
				date: "30 August 2019",
				views: 26,
				comments: 28,
				catId: 2
			},
			{
				id: 2,
				image: Photo,
				title: "Blockchain.io",
				date: "29 August 2019",
				views: 25,
				comments: 29,
				catId: 1
			}
		],
		calculator: {
			range: {
				inputType: "range",
				config: {
					type: "range"
				},
				value: 0
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
		}
	};
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
	render() {
		return (
			<Grid con="true" container spacing={3}>
				<Grid item sm={7}>
					<div>
						<Header h1>
							Blockchain <span className="accent">4.0</span>
						</Header>
						<Header h2 thin mtb>
							<span className="accent">#MetaHash(MHC)</span> - Революционер на криптовалютной отрасли!{" "}
						</Header>
						<Text mbBig part>
							MetaClub - Это клуб для сообществу #MetaHash(MHC), Объединяющий Инвесторов, Программистов,
							Разработчиков и просто людей интересующей криптовалютный тематики.{" "}
						</Text>
						<NavLink to="/mhc">
							<Button white round>
								Подробнее >
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
							Что такое <span className="accent">#MetaHash?</span>
						</Header>
						<Text mtb>
							<span>#MetaHash</span> - это самый быстрый, надожный и децентрализованная криптавалюта в
							мире. Инвестирую и поддерживая децентрализованная сеть #MetaHash(MHC) вы можете зарабатывать
							на делигирования и форженге свои монеты.
						</Text>
						<Header h5>
							<NavLink to="/mhc">
								<span className="accent">Подробнее »</span>
							</NavLink>
						</Header>
					</div>
				</Grid>
				<Grid item xs={12}>
					<Calculator
						calc={this.state.calculator}
						inputChanged={this.inputChangedHandler}
						rangeChanged={this.rangeChangeHandler}
						buttonCClicked={this.buttonClickedHandler}
					/>
				</Grid>
				<Grid item xs={12}>
					<div>
						<Header center normal h3 mtb>
							Server Statistics
						</Header>
					</div>
				</Grid>
				<Hidden smDown>
					<Grid item xs={1} />
				</Hidden>
				<Grid item md={10} sm={12} xs={12}>
					<ServerCards />
				</Grid>
				<Grid item xs={12}>
					<div id="news">
						<Header center h3 normal mtb>
							News / Media
						</Header>
					</div>
				</Grid>

				{/* Pass some state */}
				<NewsItems articleClicked={this.articleHandler} news={this.state.news} limit={3} />
				<div style={{ textAlign: "center", width: "100%" }}>
					<NavLink to="/articles">
						<Button big grey buttonStyle={{ marginTop: "30px" }}>
							More news
						</Button>
					</NavLink>
				</div>
			</Grid>
		);
	}
}

export default AboutPage;
