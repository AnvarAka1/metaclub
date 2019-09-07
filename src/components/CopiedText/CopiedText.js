import React from "react";
import classes from "./CopiedText.module.css";
import Header from "../UI/Header/Header";

const copiedText = props => {
    const copiedText = props.view && <div className={classes.CopiedText}>
    <Header light h6 center>
        Copied to Clipboard
    </Header>
</div> 
    return (
	<>{copiedText}</>	
	);
};

export default copiedText;
