import React from "react";
import List from "react-list-select";

function VideosList(props) {
    const videoItems = props.videos.map((video) => video.header);
    return (
        <List items={videoItems} multiple={false} onChange={props.onClick} />
    );
}

export default VideosList;
