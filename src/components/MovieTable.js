import React, { Component } from 'react'

class MovieTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            movies: []
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
                this.setState({movies : newMovies});
            })
    }

    render() {
        // const listItems = this.state.movies.map((movie) =>
        //     <tr key={movie.name}>
        //         <td>{movie.name}</td>
        //         <td>{movie.bux}</td>
        //         <td>
        //             <textarea/>
        //         </td>
        //         <td></td>
        //     </tr>
        // );
        if(this.state.isLoaded === false) {
            return <h1>Loading...</h1>
        }
        else {
            return (
                <div>
                    <h1> FML Calculator </h1>
                    <table>
                        <tr>
                            <td>Title</td>
                            <td>Bux</td>
                            <td>Estimate</td>
                            <td>Screens</td>
                        </tr>
                        {/* {listItems} */}
                    </table>
                </div>
            );
        }
    }
}

export default MovieTable;