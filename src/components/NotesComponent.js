import React from "react";
import VideoDetail from "./VideoDetail";
import {Paper} from '@material-ui/core'

const NotesComponent = ({note, handleNoteSelect}) => {

    if(!note) {
        return(
            <div className="ui-embed">
                <p>No note for this video added yet!</p>
            </div>
        );
    }
    function convertToMinutes(time) {
        let minutes = Math.floor(time/60);
        let seconds = time%60;
        return parseInt(minutes).toString().concat(':').concat(parseInt(seconds).toString());
    }
    //console.log("NotesComponent:::" +JSON.stringify(note));
  return(
      <Paper style={{paddingTop:'2px', paddingBottom:'2px',marginTop:'2px'}}>
        <div className="ui-embed" style={{margin:'1em'}} onClick={() => handleNoteSelect(note)}>
          <p>
            <span style={{cursor:'pointer',color:'Blue'}}>{convertToMinutes(note.startTime)} : </span>
            <span style={{}}>{note.note}</span>
          </p>
        </div>
      </Paper>
  );
}
export default NotesComponent;
