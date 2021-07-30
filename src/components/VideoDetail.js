import React from "react";
import Youtube from "react-youtube";
import MContext from "./ContextProvider";
import { useEffect, useState } from "react/cjs/react.production.min";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const endpoint = "http://localhost:8080";
let startNoteTime = "";
let ytplayer = null;
const VideoDetail = ({ video }) => {
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
  //const [ytplayer,setYtplayer] = useState(null);

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  const opts = {
    height: 390,
    width: 640,
    playerVars: {
      autoplay: 1,
    },
  };

  function _onReady(event) {
    startNoteTime = "";
    let time = event.target.getCurrentTime();
    console.log("The time is ::::: " + time);
    event.target.playVideo();
    ytplayer = event.target;
  }
  const onPlayVideo = () => {
    ytplayer.playVideo();
  };
  function _getCurrentTime(event) {
    let time = ytplayer.getCurrentTime();
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    console.log("Time::" + minutes + ":" + seconds);
  }
  function _seek(event) {
    let time = document.getElementById("Note1").innerText;
    let minutes = parseInt(time.split(":")[0]);
    let seconds = parseInt(time.split(":")[1]);
    let _seconds = minutes * 60 + seconds;
    console.log(_seconds);
    ytplayer.seekTo(_seconds, true);
  }
  function _addNotes(event) {
    let time = ytplayer.getCurrentTime();
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let notesArea = (document.getElementById("notes-area").style.display =
      "block");
    startNoteTime = time;
  }
  const postDate = async (e) => {
    e.preventDefault();
    /*
        const { id, time, note } = object
        */
    const response = await fetch("/addNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //here values......
      }),
    });

    const data = await response.json();

    if (data.status != 200 || !data) {
      console.log("ERROR!");
    } else {
      console.log("Successful");
    }
  };
  const addTodb = async (notesdata) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8080",
      },
    };
    const response = await axios.post(endpoint + "/items", notesdata, config);
    if (response.status === 200 || response.status === 201) {
      console.log("data added to db");
    }
  };
  const fetchNotes = async () => {
    const { data, status } = await axios.get(endpoint + "/items");
    if (status === 200) {
    } else {
      console.log("ERROR in fetching");
    }
  };
  async function _saveNotes(event) {
    let notes = document.getElementById("notes-area").value;
    let time = ytplayer.getCurrentTime();
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let id = video.id.videoId;
    console.log(id);
    const noteTime = startNoteTime - time;
    const notesdata = {
      id: id,
      starttime: startNoteTime,
      duration: noteTime,
      note: notes,
    };
    //add to db here.......
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios.post(endpoint + "/items", notesdata, config);
    if (response.status === 200 || response.status === 201) {
      console.log("data added to db");
    }
  }
  function handleOnChange(event) {
    let savebutton = document.getElementById("savebutton");
    let notes = document.getElementById("notes-area").value;
    if (notes.value === "") {
      //as now change is not happening it's not being called anymore
      savebutton.style.display = "none";
    } else {
      savebutton.style.display = "block";
    }
  }
  let player = null;
  console.log(typeof video);
  return (
    <div>
      <div className="ui embed">
        <Youtube
          className="youtube"
          videoId={video.id.videoId}
          opts={opts}
          onReady={_onReady}
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
      <div className="search-bar ui segment">
        <TextField
          style={{ width: "100%" }}
          id="outlined-multiline-static"
          label="Start Writing Here"
          multiline
          rows={4}
          id="notes-area"
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
      >
        SaveNotes
      </Button>
    </div>
  );
};

export default VideoDetail;

/*
class VideoDetail extends React.Component{

    if (this.props === null) {
        render() {


            return <div>
                <h1>Enter search keyword to load...</h1>
                <br></br>
                <p style={{fontSize: '25px'}}>
                    Use the API to search for videos matching specific search terms, topics, locations, publication dates,
                    and much more. The APIs search.list method also supports searches for playlists and channels.

                    With the YouTube Data API, you can add a variety of YouTube features to your application. Use the API to
                    upload videos, manage playlists and subscriptions, update channel settings, and more.

                </p>
            </div>;
        }
    }
    state = {
        video: null,
        ytplayer:null
    }
}
*/
