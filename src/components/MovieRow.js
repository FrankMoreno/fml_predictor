import React, { Component } from 'react'

class MovieRow extends Component {
    render() {
        let name = this.props.name;
        let totalFilms = this.props.info;

        return (
            // TODO Fix the estimate to truncate 
            <tr key={name}>
                <td>{name}</td>
                <td>{Math.trunc(totalFilms[name])}</td>
            </tr>
        );
    }
}

export default MovieRow