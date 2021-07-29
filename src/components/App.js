import React from 'react';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import NotesComponent from "./NotesComponent";
import ContextProvider from './ContextProvider'
class App extends React.Component {

    // const tag = document.createElement("script");
    // tag.src = "https:www.youtube.com/iframe_api";

    state = {
        videos: [],
        selectedVideo: null
    }
    /*
    callbackFunction = (ytplayer) => {
        this.setState({player:ytplayer})
    }
    /*
    componentDidMount() {
        /*
        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.setAttribute("onload", "onYouTubeIframeReady()");
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        // var setPlayer;
        tag.onload = setupPlayer;
        */
        /*
        console.log("Component did mount");
        this.loadVideo();

    }

    loadVideo = () => {
        let localplayer = null;
        console.info(`loadVideo called`);

        (function loadYoutubeIFrameApiScript() {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";

            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            tag.onload = setupPlayer;
        })();


        function setupPlayer() {
            window.YT.ready(function() {
                localplayer = new window.YT.Player("player", {
                    height: "390",
                    width: "640",
                    videoId: "M7lc1UVf-VE",
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange
                    }
                });

                if(localplayer===null) {
                    console.log("localplayer is null;;;");
                }else{
                    console.log("Here it has a value");
                }
                if(localplayer!=null){
                    this.setState({player:localplayer});
                }


            });

            if(localplayer!=null) {
                console.log(localplayer.toString());
            }else{
                console.log("why is local player null!");
            }
            console.log(this.toString());

            this.setState({
                    player: localplayer
                }
            );
        }

        this.setState({
                player: localplayer
            }
        );

        function getTime(){
            let time = this.state.player.getCurrentTime();
            console.log("time is" + time);
        }

        function onPlayerReady(event) {
            event.target.playVideo();
        }

        function onPlayerStateChange(event) {
            var videoStatuses = Object.entries(window.YT.PlayerState);
            console.log(videoStatuses.find(status => status[1] === event.data)[0]);
        }
    }

    */

    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items
        })
        console.log("this is resp",response);
    };
    handleVideoSelect = (video) => {
        const _opts = {
            height: 390,
            width: 640,
            playerVars: {
                autoplay: 1
            },
        };
        this.setState({selectedVideo: video});
    }

    addNotes = (event) => {
        /*
        if (this.state.player === null){
            console.log("WTF buddy!");
            return;
        }
        console.log("AddComponent::addNotes");
        var time = this.state.player.getCurrentTime();
        console.log("time is:::"+ time)
    */
        var x = document.getElementsByClassName('youtube');
        let time = x.getCurrentTime();
        console.log(time);
        //console.log(x);



    }
    _onReady = (event) => {
        //player = event.target;
        event.target.pauseVideo();
    }

    _getCurrentTime = (event) =>{
        var time = event.target.getCurrentTime();
        console.log("Time in App component::::"+time);
    }

    render() {
        return (
            <div className='ui container' style={{marginTop: '1em'}}>
                    <SearchBar handleFormSubmit={this.handleSubmit}/>
                    <div className='ui grid'>
                        <div className="ui row">
                            </div>
                            <VideoDetail video={this.state.selectedVideo} />
                            <div className="five wide column">
                                <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                            </div>
                    </div>
            </div>
        )
    }
}

export default App;
