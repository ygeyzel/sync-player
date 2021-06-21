import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";

import "./index.css";
import "firebase/storage";
import "firebase/firestore";

import SyncPlayer from "./components/sync-player";
import VideosList from "./components/videos-list";

if (!firebase.apps.length) {
    const firebase_config = require("./secrets/fbconfig");
    firebase.initializeApp(firebase_config);
} else {
    firebase.app();
}

let fbStorage = firebase.storage();
let fbStorageRef = fbStorage.ref();
let fbDB = firebase.firestore();

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: null,
            videoHeader: "Please select a video",
            videoStartTime: null,
            videos: [],
        };

        fbDB.collection("videos-info")
            .get()
            .then((res) => {
                const videosInfo = res.docs.map((doc) => {
                    let info = doc.data();
                    info.id = doc.id;
                    return info;
                });
                let newState = Object.assign({}, this.state);
                newState.videos = videosInfo;
                this.setState(newState);
            });
    }

    onVideoSelect(videoId) {
        let newState = {};
        fbDB.collection("videos-info")
            .doc(videoId)
            .get()
            .then((res) => {
                const video = res.data();

                let urlPromise = fbStorageRef
                    .child(video.ref.path)
                    .getDownloadURL();

                newState.videoHeader = video.header;
                newState.videoStartTime = video.startTime.seconds;

                return urlPromise;
            })
            .then((url) => {
                newState.videoUrl = url;
                this.setState(newState);
            })
            .catch((err) => {});
    }

    render() {
        return (
            <div className="index">
                <div className="videoHeader">
                    <h3>{this.state.videoHeader}</h3>
                </div>
                <div className="player">
                    <SyncPlayer
                        startTime={this.state.videoStartTime}
                        url={this.state.videoUrl}
                        key={`player_${Date.now()}`}
                    />
                </div>
                <div className="videosList">
                    <VideosList
                        videos={this.state.videos}
                        onSelect={(videoId) => this.onVideoSelect(videoId)}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));
