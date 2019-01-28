import React, { Component } from 'react'

class MovieResults extends Component {
    render() {
        return (
            <div>
                <h1>Results</h1>
                <p>{this.props.results}</p>
            </div>
        );
    }
}

export default MovieResults;