import React from 'react';

import classes from './Button.module.css';

const btn = (props) => (
    <div
        className={[classes.Button, classes[props.btnType]].join(" ")}
        onClick={props.clicked}>
        {props.children}
    </div>
);

export default btn;