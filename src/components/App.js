import React from "react";
import SearchBar from "./Searchbar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import NotesComponent from "./NotesComponent";
import ContextProvider from "./ContextProvider";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import NotesList from "./NotesList";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
}));
const apiEndpoint = "http://localhost:8080";

class App extends React.Component {
  // const tag = document.createElement("script");
  // tag.src = "https:www.youtube.com/iframe_api";

  state = {
    videos: [],
    notes:[],
    selectedVideo: null,
    selectedNote: null,
    forceSeekTime: 0
  };

  handleSubmit = async (termFromSearchBar) => {
    const response = await youtube.get("/search", {
      params: {
        q: termFromSearchBar,
      },
    });

    this.setState({
      videos: response.data.items,
    });
    console.log("this is resp", response);
  };
  getNotes = async (videoId) => {
    try {
      const response = await axios.get(apiEndpoint + `/items/${videoId}`);
      if (response.status === 200) {
        console.log("successfully got notes from db");
        const _data = response.data;
        const modifiedNotes = [
          {
            id: "56843",
            note: _data.note,
            starttime: _data.starttime
          }
        ];
        return modifiedNotes;
        /*
          todo
        let _notes = [];
        for(let i=0;i<_data.note.length;i++){
          _notes.push(_data.note[i])
        }
         */
      } else {
        console.log("Some error status != 200 in APP.js");
      }
    }catch(error){
      console.log("Error in getting notes in APP.js");
    }
  }
  handleVideoSelect = async (video) => {
    const _opts = {
      height: 390,
      width: 640,
      playerVars: {
        autoplay: 1,
      },
    };
    this.setState({ selectedVideo: video });
    const _notes = await this.getNotes(video.id.videoId);
    this.setState({notes:_notes});
  };
  handleNoteSelect = (note) => {
    this.setState({selectedNote:note, forceSeekTime:Math.random() });
  };

  render() {
    console.log("AppComponent rendered();");
    return (
      <div className={makeStyles.root}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
            }}
          >
            <Paper style={{ padding: "10px" }}>
              <SearchBar handleFormSubmit={this.handleSubmit} />
            </Paper>
          </Grid>
          <Grid item xs={7} style={{ marginLeft: "20px", marginRight: "20px" }}>
            <Paper style={{ padding: "10px" }}>
              {" "}
              <VideoDetail video={this.state.selectedVideo} forceSeekTime={this.state.forceSeekTime} />
            </Paper>
          </Grid>
          <Grid item xs={4} style={{ marginLeft: "20px", marginRight: "20px" }}>
            <Paper style={{ padding: "10px" }}>
              <VideoList
                handleVideoSelect={this.handleVideoSelect}
                videos={this.state.videos}
              />
            </Paper>
          </Grid>
          <Grid item xs={7} style={{ marginLeft: "20px", marginRight: "20px" }}>
            <Paper style={{ padding: "10px" }}>
              <NotesList
                  handleNoteSelect={this.handleNoteSelect}
                  notes={this.state.notes}
              />
            </Paper>
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default App;
