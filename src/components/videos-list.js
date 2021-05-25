import React from "react";
import { Nav } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

function VideosList({ videos, ...props }) {
    return (
        <Nav {...props} appereance="default" vertical>
            {videos.map((video) => (
                <Nav.Item eventKey={video.id} key={video.id}>
                    {video.header}
                </Nav.Item>
            ))}
        </Nav>
    );
}

export default VideosList;
