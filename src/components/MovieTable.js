import React, { Component } from 'react'
import MovieResults from './MovieResults';

class MovieTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            movies: {}
        }
        this.solveForScreens = this.solveForScreens.bind(this);
        this.getEstimates = this.getEstimates.bind(this);
    }
    
    componentDidMount() {
        // TODO Add error handling 
        // TODO Check what's making this so slow
        fetch('https://thanx-fml-api.herokuapp.com/movies')
            .then(res => res.json())
            .then(result => {
                let newMovies = {}
                result.movies.forEach(movie => {
                    newMovies[movie.name] = {
                        "bux" : (movie.bux).replace(/\$/g,''),
                        "estimate" : "",
                        "screens":"1"
                    }
                })
                this.setState({
                    movies : newMovies,
                    isLoaded : true,
                    results : {}
                });
            })
    }

    onEstimateChange(movieName, event) {
        let newMovies = this.state.movies;
        newMovies[movieName].estimate = event.target.value;
        this.setState({movies : newMovies})
    }
    
    makeListItems() {
        // TODO Figure out how to make listItem into it's own component 
        let listItems = []
        for(let movieName in this.state.movies) {
            // TODO Figure out how to not go from array to object to array
            listItems.push(
                <tr key={movieName}>
                    <td>{movieName}</td>
                    <td>{this.state.movies[movieName].bux}</td>
                    <td>
                        <textarea 
                            value={this.state.movies[movieName].estimate} 
                            onChange={(event) => this.onEstimateChange(movieName, event)}
                        />
                    </td>
                </tr>
            );
        }
        return listItems;
    }

    solveForScreens() {
        // TODO Replace this library with something better supported
        let solver = require("../../node_modules/javascript-lp-solver/src/solver"),
        updatedResults,
        model = {
            "optimize" : "estimate",
            "opType" : "max",
            "constraints" : {
                "bux" : {"max":"1000"},
                "screens" : {"max" : "8"}
            },
            "variables" : this.state.movies
        };
        updatedResults = solver.Solve(model);
        this.setState({results:updatedResults});
    }

    getEstimates() {
        fetch('https://thanx-fml-api.herokuapp.com/estimates')
        .then(res => res.json())
        .then(result => {
            result.estimates.forEach(estimate => {
                let newMovies = this.state.movies;
                if(this.state.movies.hasOwnProperty(estimate.name)) {
                    let newEstimate = estimate.estimate.replace(/\$/g,'')
                    newMovies[estimate.name].estimate = parseFloat(newEstimate);
                }
                this.setState({movies : newMovies});
            })
        })
    }

    render() {
        if(this.state.isLoaded === false) {
            return <h1>Loading...</h1>
        }
        else {
            return (
                <div className="MovieTable">
                    <h1> FML Calculator </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>Title</td>
                                <td>Bux</td>
                                <td>Estimate</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.makeListItems()}
                        </tbody>
                    </table>
                    <button onClick={this.solveForScreens}>Submit</button>
                    <button onClick={this.getEstimates}>Get Estimates</button>
                    <MovieResults results={this.state.results}/>
                </div>
            );
        }
    }
}

export default MovieTable;