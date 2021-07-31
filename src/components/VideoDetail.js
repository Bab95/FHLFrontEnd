import React from "react";
import Youtube from 'react-youtube';
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
const endpoint = "http://localhost:8080";
let startNoteTime = "";
let ytplayer = null;
let showTextArea = null;
const textAreaStyle = {
    width: '100%'
};
const hideStyle = {
    display: 'none'
}
let startTime = 0;
const VideoDetail = ({ video, forceSeekTime }) => {
//function VideoDetail({video}) {
    if (!video) {

        return (

            <div style={{ marginLeft: "15px" }}>

                <h4>Enter search keyword to load...</h4>

                <br />

                <p style={{ fontSize: "16px" }}>

                    Use the API to search for videos matching specific search terms,

                    topics, locations, publication dates, and much more. The APIs

                    search.list method also supports searches for playlists and channels.

                    With the YouTube Data API, you can add a variety of YouTube features

                    to your application. Use the API to upload videos, manage playlists

                    and subscriptions, update channel settings, and more.

                </p>

            </div>

        );

    }
    if(forceSeekTime) {
        startTime = forceSeekTime;
        console.log('ForceSeekTime recieved!!!' + forceSeekTime);
    }
    const opts = {
        height: 390,
        width: 640,
        playerVars: {
            autoplay: 1,
            start: startTime
        },
    };

    function _onReady(event){
        console.log("_onReadyCalled!");
        startNoteTime = "";
        let time = event.target.getCurrentTime();
        console.log("The time is ::::: " + time);
        ytplayer = event.target;
        event.target.seekTo(startTime);
    }
    const onPlayVideo = (event) => {
        event.target.playVideo();
    }
    function _getCurrentTime(event){

        let time = ytplayer.getCurrentTime();
        let minutes = Math.floor(time/60);
        let seconds = time%60;
        console.log("Time::" + minutes + ":" + seconds);
    }
    function _addNotes(event){
        console.log("dumps::VideoDetail::_addNotes");
        let time = ytplayer.getCurrentTime();
        let minutes = Math.floor(time/60);
        let seconds = time%60;
        showTextArea = true;
        startNoteTime = time;
        //need to hide and make text area visible.....on click this
        //forcererender this component
    }
    async function _saveNotes(event){
        let text = document.getElementById("notes-area").value;
        if(text===''){
            alert('Please write something!');
            return;
        }
        let time = ytplayer.getCurrentTime();
        let minutes = Math.floor(time/60);
        let seconds = time%60;
        let id = video.id.videoId;
        console.log(id);
        const noteTime = time - startNoteTime;
        console.log("VideoDetailsDumps::::::NoteTime" + noteTime)
        const notesdatapayload = {
            "id" : id,
            "notes" : [
                {
                    "noteId" : id + Math.random().toString(),
                    "starttime" : startNoteTime,
                    "duration" : noteTime,
                    "note" : text
                }
            ]
        };
        //add to db here.......
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        try {
            const response = await axios.post(endpoint + '/items', notesdatapayload, config);
            if (response.status === 200 || response.status === 201) {
                console.log("data added to db");
            }
        }catch(error){
            console.log(error.toString());
        }
    }

    function handleOnChange(event){
        let savebutton = document.getElementById("savebutton");
        let notes = document.getElementById("notes-area").value;
        if(notes.value === ''){
            //as now change is not happening it's not being called anymore
            savebutton.style.display = 'none';
        }else{
            savebutton.style.display = 'block';
        }
    }

    return (
        <div>
            <div className="ui embed">
                <Youtube
                    className="youtube"
                    videoId={video.id.videoId}
                    opts={opts}
                    onReady={_onReady}
                    onPlay={onPlayVideo}
                    onPause={_getCurrentTime}
                />
            </div>
            <div style={{ marginTop: "1em" }}>
                <Button onClick={_addNotes} variant="contained" color="primary">
                    Add Notes
                </Button>
            </div>
            <div className="ui segment">
                <h4 className="ui header">{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
            <div className="search-bar ui segment" >
                <TextField
                    id="notes-area"
                    style={textAreaStyle}
                    label="Start Writing Here"
                    multiline
                    rows={4}
                    onChange={handleOnChange}
                    defaultValue=""
                    variant="outlined"
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                id="savebutton"
                onClick={_saveNotes}
                style={{display:'none'}}
            >
                SaveNotes
            </Button>
        </div>
    );
};

export default VideoDetail;
