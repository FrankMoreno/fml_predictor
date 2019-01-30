import React, { Component } from 'react'

class MovieResults extends Component {
    makeResultsTable() {
        let results = []
        for(let key in this.props.results) {
            if(key !== 'feasible' && key !== 'bounded') {
                results.push(
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{this.props.results[key]}</td>
                    </tr>
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