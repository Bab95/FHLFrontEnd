import React from 'react';
import NotesComponent from "./NotesComponent";

const NotesList = ({ notes , handleNoteSelect}) => {
    if(!notes) {
        return (
          <div>
              <p>No notes for this video added yet!!</p>
          </div>
        );
    }
    const renderedNotes =  notes.map((note) => {
        return <NotesComponent key={note.id} note={note} handleNoteSelect={handleNoteSelect} />
        // console.log(video.id);
    });

    return <div className='ui relaxed divided list'>{renderedNotes}</div>;
};
export default NotesList;
