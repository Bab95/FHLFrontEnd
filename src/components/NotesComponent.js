import React from "react";
import VideoDetail from "./VideoDetail";

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
      <div className="ui-embed" style={{margin:'1em'}} onClick={() => handleNoteSelect(note)}>
          <p>
            <span>{convertToMinutes(note.startTime)}::</span>
            <span>{note.note}</span>
          </p>
      </div>
  );
}
export default NotesComponent;
