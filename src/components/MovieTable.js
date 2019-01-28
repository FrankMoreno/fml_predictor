import React, { Component } from 'react'

class MovieTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            movies: {}
        }
    }
    
    componentDidMount() {
        // TODO Add error handling 
        fetch('https://thanx-fml-api.herokuapp.com/movies')
            .then(res => res.json())
            .then(result => {
                let newMovies = {}
                result.movies.forEach(movie => {
                    newMovies[movie.name] = {
                        "bux" : movie.bux,
                        "estimate" : "",
                        "screens":""
                    }
                })
                this.setState({
                    movies : newMovies,
                    isLoaded : true
                });
            })
    }

    makeListItems() {
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
                    <td>{this.state.movies[movieName].screens}</td>
                </tr>
            );
        }
        return listItems;
    }

    onEstimateChange(movieName, event) {
        let newMovies = this.state.movies;
        newMovies[movieName].estimate = event.target.value;
        this.setState({movies : newMovies})
    }

    render() {
        if(this.state.isLoaded === false) {
            return <h1>Loading...</h1>
        }
        else {
            return (
                <div>
                    <h1> FML Calculator </h1>
                    <table>
                        <tbody>
                        <tr>
                            <td>Title</td>
                            <td>Bux</td>
                            <td>Estimate</td>
                            <td>Screens</td>
                        </tr>
                        {this.makeListItems()}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default MovieTable;