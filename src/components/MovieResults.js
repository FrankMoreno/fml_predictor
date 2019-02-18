import React, { Component } from 'react'
import MovieRow from './MovieRow';

class MovieResults extends Component {
    render() {
        return (
            <div>
                <h1>Results</h1>
                <table>
                    <tbody>
                        {MovieRows(this.props)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function MovieRows(props) {
    let results = []
        for(let key in props.results) {
            if(key !== 'feasible' && key !== 'bounded' && key !== 'result') {
                results.push(
                    <MovieRow key={key} name={key} info={props.results}/>
                );
            }
        }
        return results;
}

export default MovieResults;