import React, { Component } from 'react'

class MovieRow extends Component {
    render() {
        let {name, total} = this.props;

        return ( 
            <tr key={name}>
                <td>{name.toUpperCase()}</td>
                <td>{Math.round(total)}</td>
            </tr>
        );
    }
}

export default MovieRow