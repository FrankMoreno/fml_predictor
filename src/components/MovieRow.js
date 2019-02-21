import React, { Component } from 'react'

class MovieRow extends Component {
    render() {
        let {name, total} = this.props;

        return (
            // TODO Fix the estimate to truncate 
            <tr key={name}>
                <td>{name.toUpperCase()}</td>
                <td>{Math.round(total)}</td>
            </tr>
        );
    }
}

export default MovieRow