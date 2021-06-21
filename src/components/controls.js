import React from "react";

function ControlsBar({ buttons }) {
    return (
        <div className="controlsBar">
            {buttons.map((button) => (
                <img src={button.img} onClick={button.clickCB} alt="?" />
            ))}
        </div>
    );
}

export default ControlsBar;
