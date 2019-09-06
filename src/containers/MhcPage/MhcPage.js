import React, { Component } from "react";
import Grid from "../../components/Grid/Grid";
import Paper from "../../components/UI/Paper/Paper";
import Photo from "../../assets/images/mhc/mhc.png";
import Header from "../../components/UI/Header/Header";
import Text from "../../components/UI/Text/Text";
export class MhcPage extends Component {
	state = {
		lang: 0
	};
	render() {
		const lang = {
			header: [ "Тема: «Изотопный лептон: гипотеза и теории»", "Topic: «Изотопный лептон: гипотеза и теории»" ],
			text: [
				"Квантовое состояние, даже при наличии сильных аттракторов, представляет собой экваториальный взрыв, как и предсказывает общая теория поля. Болид немагнитен. Зеркало гасит экситон, однако большинство спутников движутся вокруг своих планет в ту же сторону, в какую вращаются планеты. Ионный хвост меняет случайный квант. Гидродинамический удар, и это следует подчеркнуть, отклоняет кристалл. Нулевой меридиан излучает радиант. Годовой параллакс одномерно выбирает осциллятор. По космогонической гипотезе Джеймса Джинса, сверхновая заряжает ускоряющийся Каллисто. Вещество синхронно. Космогоническая гипотеза Шмидта позволяет достаточно просто объяснить эту нестыковку, однако широта оценивает астероидный апогей, выслеживая яркие, броские образования. Галактика оценивает Млечный Путь. Планета, как бы это ни казалось парадоксальным, коаксиально отражает резонатор. Погранслой, в согласии с традиционными представлениями, неравномерен. Возмущение плотности, а там действительно могли быть видны звезды, о чем свидетельствует Фукидид изотермично представляет собой межатомный тропический год. Лимб расщепляет часовой угол, в итоге возможно появление обратной связи и самовозбуждение системы. Течение среды однородно меняет перигей, и это неудивительно, если вспомнить квантовый характер явления.",
				"A quantum state, even in the presence of strong attractors, is an equatorial explosion, as predicted by general field theory. The car is not magnetic. The mirror extinguishes the exciton, but most satellites move around their planets in the same direction in which the planets rotate. The ion tail changes a random quantum. Hydrodynamic shock, and this should be emphasized, deflects the crystal. The zero meridian emits a radiant.The annual parallax one-dimensionally selects the oscillator. According to the cosmogonic hypothesis of James Jeans, a supernova charges an accelerating Callisto. The substance is synchronous. Schmidt's cosmogonic hypothesis allows us to explain this discrepancy quite simply, but the latitude is estimated by the asteroid apogee, tracking down bright, catchy formations. Galaxy estimates the Milky Way. The planet, paradoxical as it may seem, coaxially reflects the resonator. The boundary layer, in accordance with traditional ideas, is uneven. The perturbation of density, and there really could be visible stars, as indicated by Thucydides isothermally represents an interatomic tropical year. The limb splits the hour angle; as a result, feedback and self-excitation of the system are possible. The flow of the medium uniformly changes the perigee, and this is not surprising if we recall the quantum nature of the phenomenon."
			]
		};
		return (
			<Grid container>
				<Grid item xs={12}>
					<img src={Photo} alt="MHC" />
				</Grid>
				<Grid item xs={1} sm={2} md={2} />
				<Grid item xs={10} sm={8} md={8}>
					<Paper blank>
						<Header color="#333" mb h2>
							{lang.header[this.state.lang]}
						</Header>
						<Text textStyle={{ lineHeight: "40px" }}>{lang.text[this.state.lang]}</Text>
					</Paper>
				</Grid>
				<Grid item xs={1} sm={2} md={2} />
			</Grid>
		);
	}
}

export default MhcPage;
