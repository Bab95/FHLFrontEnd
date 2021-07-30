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
        startTime += forceSeekTime;
        startTime += 100;
    }
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
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
    function _seek(event){
        let time = document.getElementById("Note1").innerText;
        let minutes = parseInt(time.split(':')[0]);
        let seconds = parseInt(time.split(':')[1]);
        let _seconds = minutes*60 + seconds;
        console.log(_seconds);
        ytplayer.seekTo(_seconds, true);
    }
    function _addNotes(event){
        console.log("dumps::VideoDetail::_addNotes");
        let time = ytplayer.getCurrentTime();
        let minutes = Math.floor(time/60);
        let seconds = time%60;
        showTextArea = true;
        startNoteTime = time;
        //need to hide and make text area visible.....on click this
    }
    const addTodb = async (notesdata) => {
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const response = await axios.post(endpoint + '/items', notesdata, config);
        if(response.status === 200 || response.status===201){
            console.log("data added to db");
        }
    }
    const fetchNotes = async () => {

        const {data, status} = await axios.get(endpoint + '/items');
        if(status === 200){
            var _notes = document.getElementById("oldNotes").style.display='block';
            console.log("FETCH DUMPS:::::" + data);
            let _notesString = '';
            for(var i=0;i<data.length;i++){
                console.log(data[i].note);
                _notesString += data[i].note;
                _notesString += '\n';
            }
        }else{
            console.log("ERROR in fetching");
        }
    }
    async function _saveNotes(event){
        let notes = document.getElementById("notes-area").value;
        let time = ytplayer.getCurrentTime();
        let minutes = Math.floor(time/60);
        let seconds = time%60;
        let id = video.id.videoId;
        console.log(id);
        const noteTime = time - startNoteTime;
        console.log("VideoDetailsDumps::::::NoteTime" + noteTime)
        const notesdata = {
            id : id,
            starttime : startNoteTime,
            duration : noteTime,
            note : notes
        };
        const notesdatajson = JSON.stringify(notesdata);
        let payload = {
            "id" : notesdata.id,
            "starttime" : notesdata.starttime,
            "duration" : notesdata.duration,
            "note" : notesdata.note
        }
        console.log("VideoDetailsDumps::::::NoteTime"+ notesdatajson);
        //add to db here.......
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        try {
            const response = await axios.post(endpoint + '/items', payload, config);
            if (response.status === 200 || response.status === 201) {
                console.log("data added to db");
            }
        }catch(error){
            console.log(error.toString());
        }
    }
    function _forceSeek(){
        console.log("ForceSeek Called yay!!!");
        ytplayer.seekTo(startTime, true);
    }
    function handleOnChange(event){
        console.log("dumps::VideoDetails::handleOnChange");
        let savebutton = document.getElementById("savebutton");
        let notes = document.getElementById("notes-area").value;
        if(notes.value === ''){
            //as now change is not happening it's not being called anymore
            savebutton.style.display = 'none';
        }else{
            savebutton.style.display = 'block';
        }
    }

    let player = null;
    console.log(typeof video);
    console.log("Force SeekTime::" + startTime);
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
