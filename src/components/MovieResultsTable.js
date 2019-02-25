import React, { Component } from 'react'
import MovieRow from './MovieRow';

class MovieResultsTable extends Component {
    MovieRows() {
        let results = []
            for(let key in this.props.results) {
                if(key !== 'feasible' && key !== 'bounded' && key !== 'result') {
                    results.push(
                        <MovieRow key={key} name={key} total={this.props.results[key]}/>
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
                        {this.MovieRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MovieResultsTable;