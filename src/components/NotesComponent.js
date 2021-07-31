import React from "react";
import VideoDetail from "./VideoDetail";
import { MContext } from "./ContextProvider";

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
    console.log("NotesComponent:::" +JSON.stringify(note));
  //const NotesComponent = () => {
  return(
      <div className="ui-embed" style={{margin:'1em'}} onClick={() => handleNoteSelect(note)}>
        <p>{convertToMinutes(note.startTime)}::{note.note}</p>
      </div>
  );
}
export default NotesComponent;
