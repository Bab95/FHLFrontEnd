import React from 'react'
import VideoDetail from "./VideoDetail";
import {MContext} from "./ContextProvider";
class NotesComponent extends React.Component{
//const NotesComponent = () => {


    addNotes = (event) => {
        console.log("NotesComponent::AddNotes");
        this.props.addNotes();
    }

    /*
    function addNotes(){
        var time = localplayer.getCurrentTime();
        console.log("Notes componenet ::: " + time);
    }*/
    //let youtubePlayer = null;
    state = {
        youtubeplayer:null
    }
    render() {
        return (
            <div>
                <button>Add Notes</button>
            </div>
        )
    }
}
export default NotesComponent
/*
*           App
* youtube       notes
*
*
* */
