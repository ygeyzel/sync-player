import React from "react";

function ControlsBar({ buttons }) {
    return (
        <div className="controlsBar">
            {buttons.map((button, i) => (
                <img
                    className="controlsBarIcon"
                    src={button.img}
                    onClick={button.clickCB}
                    alt="?"
                    key={`button_icon_${i}`}
                />
            ))}
        </div>
    );
}

export default ControlsBar;
