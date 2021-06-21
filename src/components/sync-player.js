import React from "react";
import ReactPlayer from "react-player";

import ControlsBar from "./controls.js";

const PLAY_ICON = "playicon.png";
const PAUSE_ICON = "pauseicon.png";

class SyncPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.playerRef = React.createRef();
        this.seekToOffset = this.seekToOffset.bind(this);
        this.pause = this.pause.bind(this);
        this.play = this.play.bind(this);

        this.state = {
            playing: true,
        };
    }

    seekToOffset() {
        const player = this.playerRef.current;
        const duration = player.getDuration() * 1000;
        const startTime = this.props.startTime;
        const currentTime = Date.now();

        let offset = (currentTime - startTime) / duration;
        offset = offset - Math.floor(offset);
        player.seekTo(offset, "fraction");
    }

    pause() {
        this.setState({ playing: false });
    }

    play() {
        this.setState({ playing: true });
    }

    render() {
        const controlsBarButtons = [
            {
                img: this.state.playing ? PAUSE_ICON : PLAY_ICON,
                clickCB: this.state.playing ? this.pause : this.play,
            },
        ];

        return (
            <div>
                <ReactPlayer
                    playing={this.state.playing}
                    ref={this.playerRef}
                    onPlay={this.seekToOffset}
                    url={this.props.url ? this.props.url : ""}
                    loop={true}
                />
                <ControlsBar buttons={controlsBarButtons} />
            </div>
        );
    }
}

export default SyncPlayer;
