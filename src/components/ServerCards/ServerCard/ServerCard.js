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
    <Card server mb>
      <Header h4 light>
        beartorrent|cn|90/95|@bear_nodes
      </Header>
      <div className={classes.Horizontal}>
        <div style={{ width: "18%" }} className={classes.Cell}>
          <div>
            <Header h4 light normal>
              Region:
            </Header>
            <Header h4 light>
              America
            </Header>
          </div>
        </div>
        <div style={{ width: "23%" }} className={classes.Cell}>
          <div>
            <Header h4 light normal>
              Node role:
            </Header>
            <Header h4 light green>
              Peer Node
            </Header>
          </div>
        </div>
        <div style={{ width: "19%" }} className={classes.Cell}>
          <div>
            <Header h4 light normal>
              Node ROI:
            </Header>
            <Header h4 light>
              1.057438 #MHC
            </Header>
          </div>
        </div>
        <div style={{ width: "38%" }} className={classes.Cell}>
          <div>
            <Header h4 light normal>
              Founded from delegators:
            </Header>
            <Header h4 light>
              1669899.545578 #MHC
            </Header>
          </div>
        </div>
      </div>
      <ServerSubCard text={text}></ServerSubCard>
    </Card>
  );
};

export default serverCard;
