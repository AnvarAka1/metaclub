import React from "react";
import classes from "./ServerCard.module.css";
import Card from "../../UI/Card/Card";
import Header from "../../UI/Header/Header";
import ServerSubCard from "../ServerSubCard/ServerSubCard";
const serverCard = props => {
	const { id, name, region, role, roi, delegators, value } = props.serverCard;
	const text = value
		? value
		: "app://ForgingMHC #!/delegation/server/0x00fveasd215fsa6f2sa34f8wqf12v3xc16xb54vc65b1vc2n";
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
								{role}
							</Header>
						</td>

						<td>
							<Header h5 light>
								{roi}
							</Header>
						</td>

						<td>
							<Header h5 light>
								{delegators}
							</Header>
						</td>
					</tr>
				</tbody>
			</table>
			<ServerSubCard id={id} copied={props.copied} text={text} />
		</Card>
	);
};

export default serverCard;
