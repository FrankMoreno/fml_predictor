import React, { Component } from 'react'
import MovieResultsTable from './MovieResultsTable';

class MovieTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            movies: {},
            includeBonuses: false,
            results: {},
            bestPerformer: {
                name: "",
                amount: -1
            }
        }
        this.solveForScreens = this.solveForScreens.bind(this);
        this.getEstimates = this.getEstimates.bind(this);
        this.toggleBonuses = this.toggleBonuses.bind(this);
        this.getNewRatio = this.getNewRatio.bind(this);
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
                    });
                },
                error => {
                    this.setState({isLoaded : true});
                    console.log(error);
                })
    }

    getEstimates() {
        fetch('https://thanx-fml-api.herokuapp.com/estimates')
            .then(res => res.json())
            .then(
                result => {
                    let newMovies = JSON.parse(JSON.stringify(this.state.movies));
                    let newBestPerformer = {name:"", amount:-1};

                    result.estimates.forEach(estimate => {
                        if (this.state.movies.hasOwnProperty(estimate.name)) {
                            let newEstimate = estimate.estimate.replace(/\$/g, '')
                            newMovies[estimate.name].estimate = parseFloat(newEstimate);
                            newMovies[estimate.name].ratio = (newMovies[estimate.name].estimate)/(newMovies[estimate.name].bux); 
                            if(newMovies[estimate.name].ratio > newBestPerformer.amount) {
                                newBestPerformer.name = estimate.name;
                                newBestPerformer.amount = newMovies[estimate.name].ratio;
                            }
                        }
                    });
                    this.setState({ movies: newMovies, bestPerformer: newBestPerformer });
                },
                error => {
                    console.log(error);
                });
    }

    onEstimateChange(movieName, event) {
        // This creates a reference copy, do NOT want this
        let newMovies = JSON.parse(JSON.stringify(this.state.movies));
        newMovies[movieName].estimate = event.target.value;
        this.setState({ movies: newMovies })
    }

    getNewRatio(movieName, event) {
        // This creates a reference copy, do NOT want this
        let newMovies = JSON.parse(JSON.stringify(this.state.movies));
        newMovies[movieName].ratio = (event.target.value)/(newMovies[movieName].bux);
        if(newMovies[movieName].ratio > this.state.bestPerformer.amount) {
            let newBestPerformer = {
                name: movieName,
                amount: newMovies[movieName].ratio
            };
            this.setState({ bestPerformer: newBestPerformer })
        }
        this.setState({ movies: newMovies });
    }

    toggleBonuses() {
        this.setState(state => ({
            includeBonuses : !state.includeBonuses
        }));
    }

    solveForScreens() {
        // TODO Look into other Linear Programming libraries
        let movies = JSON.parse(JSON.stringify(this.state.movies));
        console.log( movies[this.state.bestPerformer.name]);
        if(this.state.includeBonuses) {
            movies[this.state.bestPerformer.name].estimate += 2;
        }
        console.log( movies[this.state.bestPerformer.name]);
        let solver = require("../../node_modules/javascript-lp-solver/src/solver"),
            updatedResults,
            model = {
                "optimize": "estimate",
                "opType": "max",
                "constraints": {
                    "bux": { "max": "1000" },
                    "screens": { "max": "8" },
                },
                "variables": movies
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
                            onBlur={(event) => this.getNewRatio(movieName, event)}
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
                        Include bonuses?
                    </div>
                    <MovieResultsTable results={this.state.results} />
                </div>
            );
        }
    }
}

export default MovieTable;