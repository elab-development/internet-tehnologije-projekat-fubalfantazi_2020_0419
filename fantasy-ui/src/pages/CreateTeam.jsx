import React, {useEffect} from 'react';
import axiosInstance from "../axiosInstance";
import PageTitle from "../components/PageTitle";
import {Col, Form, Row} from "react-bootstrap";
import PriceBox from "../components/PriceBox";

const CreateTeam = () => {
    const poruka = "Select your team of 11 players in the budget of 100M";
    const [players, setPlayers] = React.useState([]);
    const [goalkeepers, setGoalkeepers] = React.useState([]);
    const [defenders, setDefenders] = React.useState([]);
    const [midfielders, setMidfielders] = React.useState([]);
    const [forwards, setForwards] = React.useState([]);
    const [totalPricePlayers, setTotalPricePlayers] = React.useState(0.00);

    const userTeam = JSON.parse(window.sessionStorage.getItem('userTeam'));

    useEffect(() => {
        axiosInstance.get('/players')
            .then(response => {
                console.log(response.data);
                let allPlayers = response.data.data;
                setPlayers(allPlayers);
                setGoalkeepers(allPlayers.filter(player => player.player_position === 'GK'));
                setDefenders(allPlayers.filter(player => player.player_position === 'DF'));
                setMidfielders(allPlayers.filter(player => player.player_position === 'MF'));
                setForwards(allPlayers.filter(player => player.player_position === 'FW'));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [player1, setPlayer1] = React.useState(null);
    const [player2, setPlayer2] = React.useState(null);
    const [player3, setPlayer3] = React.useState(null);
    const [player4, setPlayer4] = React.useState(null);
    const [player5, setPlayer5] = React.useState(null);
    const [player6, setPlayer6] = React.useState(null);
    const [player7, setPlayer7] = React.useState(null);
    const [player8, setPlayer8] = React.useState(null);
    const [player9, setPlayer9] = React.useState(null);
    const [player10, setPlayer10] = React.useState(null);
    const [player11, setPlayer11] = React.useState(null);

    useEffect(() => {
        let totalPrice = 0;
        if (player1) {
            totalPrice += parseFloat(player1.player_price);
        }
        if (player2) {
            totalPrice += parseFloat(player2.player_price);
        }
        if (player3) {
            totalPrice += parseFloat(player3.player_price);
        }
        if (player4) {
            totalPrice += parseFloat(player4.player_price);
        }
        if (player5) {
            totalPrice += parseFloat(player5.player_price);
        }
        if (player6) {
            totalPrice += parseFloat(player6.player_price);
        }
        if (player7) {
            totalPrice += parseFloat(player7.player_price);
        }
        if (player8) {
            totalPrice += parseFloat(player8.player_price);
        }
        if (player9) {
            totalPrice += parseFloat(player9.player_price);
        }
        if (player10) {
            totalPrice += parseFloat(player10.player_price);
        }
        if (player11) {
            totalPrice += parseFloat(player11.player_price);
        }
        setTotalPricePlayers(parseFloat(totalPrice));
    }, [player1, player10, player11, player2, player3, player4, player5, player6, player7, player8, player9]);

    const btnDisabled = !(player1 !== null && player2 !== null && player3 !== null && player4 !== null && player5 !== null && player6 !== null && player7 !== null && player8 !== null && player9 !== null && player10 !== null && player11 !== null && totalPricePlayers <= 100);


    const createTeam = () => {
        let data = {
            player1: player1.id,
            player2: player2.id,
            player3: player3.id,
            player4: player4.id,
            player5: player5.id,
            player6: player6.id,
            player7: player7.id,
            player8: player8.id,
            player9: player9.id,
            player10: player10.id,
            player11: player11.id,
            user_team_id: userTeam.id
        }

        axiosInstance.post('/create-team', data)
            .then(response => {
                console.log(response.data);
                window.sessionStorage.setItem('madeTeam', true);
                window.location.href = '/my-team';
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <PageTitle title="Create your team" subtitle={poruka} />
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Player 1</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer1(player);
                        }}>
                            {
                                goalkeepers && goalkeepers.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Player 2</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer2(player);
                        }}>
                            {
                                defenders && defenders.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Player 3</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer3(player);
                        }}>
                            {
                                defenders && defenders.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Player 4</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer4(player);
                        }}>
                            {
                                defenders && defenders.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                            {
                                midfielders && midfielders.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Player 5</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer5(player);
                        }}>
                            {
                                defenders && defenders.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                            {
                                midfielders && midfielders.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Player 6</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer6(player);
                        }}>
                            {
                                midfielders && midfielders.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Player 7</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer7(player);
                        }}>
                            {
                                midfielders && midfielders.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Player 8</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer8(player);
                        }}>
                            {
                                midfielders && midfielders.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Player 9</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer9(player);
                        }}>
                            {
                                midfielders && midfielders.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                            {
                                forwards && forwards.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Player 10</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer10(player);
                        }}>
                            {
                                forwards && forwards.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Player 11</Form.Label>
                        <Form.Control as="select" onChange={(event) => {
                            let player = players.find(player => player.id === parseInt(event.target.value));
                            setPlayer11(player);
                        }}>
                            {
                                forwards && forwards.map(player => (
                                    <option key={player.id} value={player.id}>{player.player_name}({player.player_position}) - {player.player_price} - {player.team_short}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <PriceBox totalPricePlayers={totalPricePlayers} />
                    <button disabled={btnDisabled} className="btn btn-dark mt-3 p-5" onClick={createTeam}>Save team</button>
                </Col>
            </Row>
        </>
    );
};

export default CreateTeam;