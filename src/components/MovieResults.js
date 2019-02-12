import React, { Component } from 'react'
import MovieRow from './MovieRow';

class MovieResults extends Component {
    makeResultsTable() {
        let results = []
        for(let key in this.props.results) {
            if(key !== 'feasible' && key !== 'bounded' && key !== 'result') {
                results.push(
                    <MovieRow key={key} name={key} info={this.props.results}/>
                );
            }
        }
        return results;
    }
    render() {
        return (
            <div>
                <h1>Results</h1>
                <table>
                    <tbody>
                        {this.makeResultsTable()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MovieResults;