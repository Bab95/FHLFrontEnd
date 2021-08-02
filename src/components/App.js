import React from "react";
import SearchBar from "./Searchbar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import NotesComponent from "./NotesComponent";
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
    //console.log("this is resp", response.data.items);
  };
  getNotes = async (videoId) => {
    try {
      const response = await axios.get(apiEndpoint + `/items/${videoId}`);
      if (response.status === 200) {
        const notes = response.data.notes;
        return notes;
      } else {
        console.log("Some error status != 200 in APP.js" + response.status);
        return null;
      }
    }catch(error){
      console.log("Error in getting notes in APP.js");
    }
  }
  handleVideoSelect = async (video) => {
    this.setState({ selectedVideo: video });
    const _notes = await this.getNotes(video.id.videoId);
    if(_notes===null){
      //null handling if video is being played first time should show nothing so dummy note
      console.log("this is a new video no new rendering should happen here");
    }else {
      this.setState({notes: _notes});
    }
  };
  handleNoteSelect = (note) => {
    this.setState({selectedNote:note, forceSeekTime:note.startTime });
  };
  handleAddNote = async () => {
    const _notes = await this.getNotes(this.state.selectedVideo.id.videoId);
    this.setState({notes:_notes});
  }

  render() {
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
              <VideoDetail video={this.state.selectedVideo} forceSeekTime={this.state.forceSeekTime} handleAddNote={this.handleAddNote} />
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
