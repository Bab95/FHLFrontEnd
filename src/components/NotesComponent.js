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
  //const NotesComponent = () => {
  return(
      <div className="ui-embed" onClick={() => handleNoteSelect(note)}>
        <p>{note.note}</p>
      </div>
  );
}
export default NotesComponent;
