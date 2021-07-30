import React from "react";

class Searchbar extends React.Component {
  handleChange = (event) => {
    this.setState({
      term: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleFormSubmit(this.state.term);
  };
  render() {
    return (
      <>
        <h2 style={{ textAlign: "center" }}>
          <img
            style={{
              width: "100px",
              height: "100px",
              justifyContent: "center",
            }}
            src="https://smartinwi.com/wp-content/uploads/2020/09/videonotes.jpg"
            alt="youtube logo"
          />
        </h2>
        <div className="search-bar ui segment">
          <form onSubmit={this.handleSubmit} className="ui form">
            <div className="field">
              <label htmlFor="video-search">Video Search</label>
              <input
                onChange={this.handleChange}
                name="video-search"
                type="text"
                placeholder="Search.."
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default Searchbar;
