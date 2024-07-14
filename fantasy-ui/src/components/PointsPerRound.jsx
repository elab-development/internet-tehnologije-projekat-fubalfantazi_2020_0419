import React from 'react';
import PropTypes from 'prop-types';
import {Table} from "react-bootstrap";

const PointsPerRound = props => {
    const {playerData} = props;
    return (
        <>
            <Table hover>
                <thead>
                    <tr>
                        <th>Player name</th>
                        <th>Player position</th>
                        <th>Player price</th>
                        <th>Team</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        playerData.map(player => (
                            <tr key={player.id}>
                                <td>{player.player_name}</td>
                                <td>{player.player_position}</td>
                                <td>{player.player_price}M</td>
                                <td>{player.team_name}</td>
                                <td>{player.points}</td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">Total</td>
                        <td>{playerData.reduce((acc, player) => acc + player.points, 0)}</td>
                    </tr>
                </tfoot>
            </Table>
        </>
    );
};

PointsPerRound.propTypes = {
    playerData: PropTypes.array.isRequired,
};

export default PointsPerRound;