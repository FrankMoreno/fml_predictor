import React, { Component } from 'react'
import MovieResultsTable from './MovieResultsTable';

class MovieTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            movies: {},
            includeBonuses: false
        }
        this.solveForScreens = this.solveForScreens.bind(this);
        this.getEstimates = this.getEstimates.bind(this);
        this.toggleBonuses = this.toggleBonuses.bind(this);
    }

    componentDidMount() {
        // TODO Cache this somewhere
        fetch('https://thanx-fml-api.herokuapp.com/movies')
            .then(res => res.json())
            .then(
                result => {
                    let newMovies = {}
                    result.movies.forEach(movie => {
                        newMovies[movie.name] = {
                            bux: (movie.bux).replace(/\$/g, ''),
                            posterLink: movie.posterLink,
                            estimate: "",
                            screens: "1",
                            ratio : -1
                        }
                    });

                    this.setState({
                        movies: newMovies,
                        isLoaded: true,
                        results: {}
                    });
                },
                error => {
                    this.setState({isLoaded : true});
                    console.log(error);
                })
    }

    onEstimateChange(movieName, event) {
        let newMovies = this.state.movies;
        newMovies[movieName].estimate = event.target.value;
        newMovies[movieName].ratio = (event.target.value)/(newMovies[movieName].bux);
        this.setState({ movies: newMovies })
    }

    getEstimates() {
        fetch('https://thanx-fml-api.herokuapp.com/estimates')
            .then(res => res.json())
            .then(
                result => {
                    result.estimates.forEach(estimate => {
                        let newMovies = this.state.movies;
                        if (this.state.movies.hasOwnProperty(estimate.name)) {
                            let newEstimate = estimate.estimate.replace(/\$/g, '')
                            newMovies[estimate.name].estimate = parseFloat(newEstimate);
                            newMovies[estimate.name].ratio = (newMovies[estimate.name].estimate)/(newMovies[estimate.name].bux); 
                        }
                        this.setState({ movies: newMovies });
                    });
                },
                error => {
                    console.log(error);
                });
    }

    toggleBonuses() {
        this.setState(state => ({
            includeBonuses : !state.includeBonuses
        }));
    }

    solveForScreens() {
        // TODO Look into other Linear Programming libraries
        let solver = require("../../node_modules/javascript-lp-solver/src/solver"),
            updatedResults,
            model = {
                "optimize": "estimate",
                "opType": "max",
                "constraints": {
                    "bux": { "max": "1000" },
                    "screens": { "max": "8" },
                },
                "variables": this.state.movies
            };
        updatedResults = solver.Solve(model);
        this.setState({ results: updatedResults });
    }

    makeListItems() {
        // TODO Figure out how to make listItem into it's own component 
        let listItems = []
        for (let movieName in this.state.movies) {
            // TODO Figure out how to not go from array to object to array
            listItems.push(
                <tr key={movieName}>
                    <td>
                        <img className='moviePosterImage' src={this.state.movies[movieName].posterLink} alt='Movie Poster' />
                    </td>
                    <td>{movieName}</td>
                    <td>{this.state.movies[movieName].bux}</td>
                    <td>
                        <input type="text"
                            value={this.state.movies[movieName].estimate}
                            onChange={(event) => this.onEstimateChange(movieName, event)}
                        />
                    </td>
                </tr>
            );
        }
        return listItems;
    }

    render() {
        if (this.state.isLoaded === false) {
            return <h1>Loading...</h1>
        }
        else {
            return (
                <div className="MovieTable">
                    <h1> FML Calculator </h1>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Bux</th>
                                <th>Estimate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.makeListItems()}
                        </tbody>
                    </table>
                    <button onClick={this.solveForScreens}>Submit</button>
                    <button onClick={this.getEstimates}>Get Estimates</button>
                    <div id="estimatesCheckbox">
                        <input id="includeBonuses" type="checkbox" onClick={this.toggleBonuses}/>    
                        <span>Include bonuses?</span>
                    </div>
                    <MovieResultsTable results={this.state.results} />
                </div>
            );
        }
    }
}

export default MovieTable;