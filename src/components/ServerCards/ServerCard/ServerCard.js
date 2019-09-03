import React from "react";
import classes from "./ServerCard.module.css";
import Card from "../../UI/Card/Card";
import Header from "../../UI/Header/Header";
import ServerSubCard from "../ServerSubCard/ServerSubCard";
const serverCard = props => {
  const text = props.value
    ? props.value
    : "app://ForgingMHC #!/delegation/server/0x00fveasd215fsa6f2sa34f8wqf12v3xc16xb54vc65b1vc2n";
  return (
    <Card server mb scroll>
      <Header h5 light>
        beartorrent|cn|90/95|@bear_nodes
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
                America
              </Header>
            </td>

            <td>
              <Header h5 light>
                Peer Node
              </Header>
            </td>

            <td>
              <Header h5 light>
                1.057438 #MHC
              </Header>
            </td>

            <td>
              <Header h5 light>
                1669899.545578 #MHC
              </Header>
            </td>
          </tr>
        </tbody>
      </table>
      <ServerSubCard text={text}></ServerSubCard>
    </Card>
  );
};

export default serverCard;
