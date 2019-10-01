import React from "react";
import classes from "./ServerCard.module.css";
import Card from "../../UI/Card/Card";
import Header from "../../UI/Header/Header";
import ServerSubCard from "../ServerSubCard/ServerSubCard";
const serverCard = props => {
	const { id, name, region, node_role, node_roi, capitalization, link } = props.serverCard;
	const { lang } = props;
	const content = {
		region: [ "Регион", "Region" ],
		role: [ "Роль", "Role" ],
		roi: [ "ROI", "ROI" ],
		delegators: [ "Основан из делегатов", "Founded from delegators" ]
	};
	return (
		<Card server mb scroll>
			<Header h5 light>
				{name}
			</Header>
			<table className={classes.Table}>
				<thead>
					<tr>
						<th>
							<Header h5 light normal>
								{content.region[lang]}
							</Header>
						</th>
						<th>
							<Header h5 light normal>
								{content.role[lang]}
							</Header>
						</th>
						<th>
							<Header h5 light normal>
								{content.roi[lang]}
							</Header>
						</th>
						<th>
							<Header h5 light normal>
								{content.delegators[lang]}
							</Header>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<Header h5 light>
								{region}
							</Header>
						</td>

						<td>
							<Header h5 light>
								{node_role}
							</Header>
						</td>

						<td>
							<Header h5 light>
								{node_roi}
							</Header>
						</td>

						<td>
							<Header h5 light>
								{capitalization}
							</Header>
						</td>
					</tr>
				</tbody>
			</table>
			<ServerSubCard id={id} copied={props.copied} text={link} />
		</Card>
	);
};

export default serverCard;
