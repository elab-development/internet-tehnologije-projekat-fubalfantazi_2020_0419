import React from 'react';
import PropTypes from 'prop-types';
import {Accordion} from "react-bootstrap";

const GamesBox = props => {

    const {games, setSelectedGame} = props;

    return (
        <>
            <Accordion defaultActiveKey="0" flush>

                {
                    games && games.map((game, index) => (
                        <Accordion.Item onClick={() => setSelectedGame(game)} key={game.id} eventKey={index}>
                            <Accordion.Header>{game.home.team_name} vs {game.away.team_name}</Accordion.Header>
                            <Accordion.Body>
                                {game.game_score_home} : {game.game_score_away}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </>
    );
};

GamesBox.propTypes = {
    games: PropTypes.array.isRequired,
    setSelectedGame: PropTypes.func.isRequired
};

export default GamesBox;