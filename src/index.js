import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import firebase from "firebase/app";

import "./index.css";
import "firebase/storage";
import "firebase/firestore";

import SyncPlayer from "./components/sync-player";
import VideosList from "./components/videos-list";

const getFirebaseConfig = new Promise((resolve, reject) => {
    axios
        .get(`/__/firebase/init.json`)
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => reject(err));
});

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: null,
            videoHeader: "Please select a video",
            videoStartTime: null,
            videos: [],
        };

        this.props.DB.collection("videos-info")
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
        this.props.DB.collection("videos-info")
            .doc(videoId)
            .get()
            .then((res) => {
                const video = res.data();

                let urlPromise = this.props.storageRef
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

getFirebaseConfig
    .then((result) => {
        firebase.initializeApp(result);

        let fbDB = firebase.firestore();
        let fbStorage = firebase.storage();
        let fbStorageRef = fbStorage.ref();

        ReactDOM.render(
            <Index DB={fbDB} storageRef={fbStorageRef} />,
            document.getElementById("root")
        );
    })
    .catch((err) => console.log(err));
