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
        fetch('https://thanx-fml-api.herokuapp.com/')
            .then(res => res.json())
            .then(result => {
                this.setState({
                    movies: result.Status,
                    isLoaded: true
                })
            }) 
    }

    render() {
        if(this.state.isLoaded === false) {
            return <h1>Loading...</h1>
        }
        else {
            return (
                <div>
                    <h1> Movie Table </h1>
                    <h3>{this.state.movies}</h3>
                </div>
            );
        }
    }
}

export default MovieTable;