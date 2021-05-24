import React from "react";
import ReactPlayer from "react-player";


class SyncPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.playerRef = React.createRef();
        this.seekToOffset = this.seekToOffset.bind(this);
    }

    seekToOffset() {
        const player = this.playerRef.current;
        const duration = player.getDuration();
        const startTime = this.props.startTime;
        const currentTime = Math.round(Date.now() / 1000);

        const offset = (currentTime - startTime) % duration;
        player.seekTo(offset);
    }

    render() {
        return (
            <ReactPlayer
                playing={true}
                ref={this.playerRef}
                onPlay={this.seekToOffset}
                url={this.props.url ? this.props.url : ""}
                loop={true}
            />
        );
    }
}

export default SyncPlayer;
