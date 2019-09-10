import React from "react";
import classes from "./ServerCard.module.css";
import Card from "../../UI/Card/Card";
import Header from "../../UI/Header/Header";
import ServerSubCard from "../ServerSubCard/ServerSubCard";
const serverCard = props => {
	const { id, name, region, node_role, node_roi, capitalization, link } = props.serverCard;
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
								Region:
							</Header>
						</th>
						<th>
							<Header h5 light normal>
								Node role:
							</Header>
						</th>
						<th>
							<Header h5 light normal>
								Node ROI:
							</Header>
						</th>
						<th>
							<Header h5 light normal>
								Founded from delegators:
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
								{node_roi} #MHC
							</Header>
						</td>

						<td>
							<Header h5 light>
								{capitalization} #MHC
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
