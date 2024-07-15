import React, {useEffect, useState} from 'react';
import PageTitle from "../components/PageTitle";
import {Col, Form, Row, Table} from "react-bootstrap";
import axiosInstance from "../axiosInstance";
import GamesBox from "../components/GamesBox";
import useForm from "../hooks/useForm";

const RoundManagment = () => {
    const [poruka, setPoruka] = useState('');
    const [pendingRounds, setPendingRounds] = useState([]);
    const [selectedRound, setSelectedRound] = useState(null);
    const [roundStarted, setRoundStarted] = useState(false);
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [playersHome, setPlayersHome] = useState([]);
    const [playersAway, setPlayersAway] = useState([]);
    const [gameStats, setGameStats] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);

    const {form, handleChange} = useForm({
        player_id: '',
        player_goals: 0,
        player_assists: 0,
        player_yellow_cards: 0,
        player_red_cards: 0
    });

    const insertStat = () => {
        let data = {
            player_id: form.player_id,
            player_goals: form.player_goals,
            player_assists: form.player_assists,
            player_yellow_cards: form.player_yellow_cards,
            player_red_cards: form.player_red_cards,
            game_id: selectedGame.id
        }

        axiosInstance.post('/game-stats', data)
            .then(response => {
                console.log(response.data);
                setForceUpdate(!forceUpdate);
                setPoruka('Stat inserted');
            })
            .catch(error => {
                console.log(error);
                setPoruka(error.response.data.message);
            });
    }

    const startRound = () => {

        let data = {
            round_id: selectedRound.id
        }

        axiosInstance.post('/start-round', data)
            .then(response => {
                console.log(response.data);
                setPoruka('Round started');
                setRoundStarted(true);
                let round = pendingRounds.find((roundFind) => {
                    return roundFind.id === selectedRound.id;
                });

                round.status = 'active';

                setSelectedRound(round);

            })
            .catch(error => {
                console.log(error);
                setPoruka(error.response.data.message);
            });
    }

    const endRound = () => {
        let data = {
            round_id: selectedRound.id
        }

        axiosInstance.post('/end-round', data)
            .then(response => {
                console.log(response.data);
                setPoruka('Round ended');
                setRoundStarted(false);
                setSelectedRound(null);
            })
            .catch(error => {
                console.log(error);
                setPoruka(error.response.data.message);
            });
    }

    useEffect(() => {
        axiosInstance.get('/rounds')
            .then(response => {
                console.log(response.data);
                let rounds = response.data.data;

                //let pendingRounds = rounds.filter(round => round.status === 'pending');
                setPendingRounds(rounds);
            })
            .catch(error => {
                console.log(error);
            });
    }, [roundStarted]);

    useEffect(() => {
        if (!selectedRound) {
            return;
        }
        axiosInstance.get('/games/' + selectedRound.id)
            .then(response => {
                console.log(response.data);
                setGames(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [selectedRound]);

    useEffect(() => {
        if (!selectedGame) {
            return;
        }
        axiosInstance.get('/players/team/' + selectedGame.home.id)
            .then(response => {
                console.log(response.data);
                setPlayersHome(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });

        axiosInstance.get('/players/team/' + selectedGame.away.id)
            .then(response => {
                console.log(response.data);
                setPlayersAway(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });

        axiosInstance.get('/game-stats/' + selectedGame.id)
            .then(response => {
                console.log(response.data);
                setGameStats(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, [selectedGame, forceUpdate]);

    return (
        <>
            <PageTitle title="Round Management" subtitle={poruka} />
            <Row>
                <Col md={6}>
                    <h3>Pending Rounds</h3>
                    <Form.Group>
                        <Form.Label>Select Round</Form.Label>
                        <Form.Control as="select" onChange={
                            (event) => {
                                console.log("changed" + event.target.value);
                                console.log(pendingRounds);
                                let round = pendingRounds.find((roundFind) => {
                                    return roundFind.id === parseInt(event.target.value);
                                });
                                setSelectedRound(round);
                            }
                        }>
                            <option value="">Select round</option>
                            {pendingRounds.map(round => (
                                <option  key={round.id} value={round.id}>{round.round_name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    {
                        selectedRound && (
                            <>
                                <h3>Round details</h3>
                                <p>Round name: {selectedRound.round_number}</p>
                                <p>Round status: {selectedRound.status}</p>
                                {
                                    selectedRound.status === 'pending' && (
                                        <button onClick={startRound} className="btn btn-success">Start round</button>
                                    )
                                }

                                {
                                    selectedRound.status === 'active' && (
                                        <button onClick={endRound} className="btn btn-danger">End round</button>
                                    )
                                }
                            </>
                        )
                    }
                </Col>
            </Row>

            {
                selectedRound && selectedRound.status === 'active' && (
                    <Row className="mt-3">
                        <Col md={6}>
                            <h3>Games</h3>
                            <GamesBox games={games} setSelectedGame={setSelectedGame} />
                        </Col>
                        <Col md={6}>
                            <h3>Stats</h3>
                            {
                                selectedGame && (
                                    <p>{selectedGame.home.team_name} vs {selectedGame.away.team_name}</p>
                                )
                            }
                            {
                                gameStats && (
                                    <Table hover>
                                        <thead>
                                        <tr>
                                            <th>Player</th>
                                            <th>Goals</th>
                                            <th>Assists</th>
                                            <th>Yellow cards</th>
                                            <th>Red cards</th>
                                            <th>Points</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            gameStats.map(stat => (
                                                <tr key={stat.id}>
                                                    <td>{stat.player.player_name}</td>
                                                    <td>{stat.player_goals}</td>
                                                    <td>{stat.player_assists}</td>
                                                    <td>{stat.player_yellow_cards}</td>
                                                    <td>{stat.player_red_cards}</td>
                                                    <td>{stat.points}</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </Table>
                                )
                            }

                            {
                                selectedGame && (
                                    <>
                                        <h3 className="m-3">Insert stat for game</h3>
                                        <Form.Group>
                                            <Form.Label>Select player</Form.Label>
                                            <Form.Control name="player_id" as="select" onChange={handleChange}>
                                                {
                                                    playersHome && playersHome.map((player, index) => (
                                                        <option key={player.id} value={player.id}>{player.player_name} ({player.player_position} - {player.team.team_name})</option>
                                                    ))
                                                }
                                                {
                                                    playersAway && playersAway.map((player, index) => (
                                                        <option key={player.id} value={player.id}>{player.player_name} ({player.player_position} - {player.team.team_name})</option>
                                                    ))

                                                }
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Goals</Form.Label>
                                            <Form.Control name="player_goals" type="number" onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Assists</Form.Label>
                                            <Form.Control name="player_assists" type="number" onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Yellow cards</Form.Label>
                                            <Form.Control name="player_yellow_cards" type="number" onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Red cards</Form.Label>
                                            <Form.Control name="player_red_cards" type="number" onChange={handleChange} />
                                        </Form.Group>
                                        <hr/>
                                        <button disabled={selectedRound.status !== 'active'} onClick={insertStat} className="btn btn-primary">Save Stat</button>
                                    </>
                                )
                            }

                        </Col>

                    </Row>
                )
            }
        </>
    );
};

export default RoundManagment;