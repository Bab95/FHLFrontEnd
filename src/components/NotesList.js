import React from 'react';
import NotesComponent from "./NotesComponent";
import {Paper} from '@material-ui/core'

const NotesList = ({ notes , handleNoteSelect}) => {
    if(!notes) {
        return (
          <div>
              <p>No notes for this video added yet!!</p>
          </div>
        );
    }
    const _notes = JSON.stringify(notes);
    //console.log("NotesListDumps::" + _notes);
    const renderedNotes =  notes.map((note) => {
        return (<Paper style={{paddingTop:'2px', paddingBottom:'2px',marginTop:'2px'}}> <NotesComponent key={note.noteId} note={note} handleNoteSelect={handleNoteSelect} /></Paper>);
        // console.log(video.id);
    });

    return <div className='ui relaxed divided list'>{renderedNotes}</div>;
};
export default NotesList;
