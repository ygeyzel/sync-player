import React from "react";

function ControlsBar({ buttons }) {
    return (
        <div className="controlsBar">
            {buttons.map((button) => (
                <img
                    src={button.img}
                    onClick={button.clickCB}
                    alt="?"
                    key={`button_icon_${Date.now()}`}
                />
            ))}
        </div>
    );
}

export default ControlsBar;
