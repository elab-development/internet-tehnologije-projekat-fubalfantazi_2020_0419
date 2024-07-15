import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Card} from "react-bootstrap";
import axiosInstance from "../axiosInstance";

const PlayerCard = props => {
    const {player, position, teams} = props;
    const team = teams.find(team => team.id === player.team_id);

    console.log(player);


    return (
        <>
            <Card className="mt-3">
                <Card.Body className="text-center">
                    <Card.Title><h3>({position}) {player.player_name}</h3></Card.Title>
                    <Card.Text>
                        <span>Team: {team ? team.team_name : ''}</span>
                        <br />
                        <span>Value: {player.player_price}M </span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};

PlayerCard.propTypes = {
    player: PropTypes.object.isRequired,
    position: PropTypes.number.isRequired,
    teams: PropTypes.array.isRequired
};

export default PlayerCard;