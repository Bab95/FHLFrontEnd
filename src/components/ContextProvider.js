import React from 'react'
export const MContext = React.createContext();
class ContextProvider extends React.Component{
    state = {
        player: null
    }
    render(){
        return (
            <MContext.Provider value={
                {
                    state: this.state,
                    setPlayer:(value) => this.setState({
                        player: value
                    })
                }
            }>
                {this.props.children}
            </MContext.Provider>
        )
    }
}
