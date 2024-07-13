import React, {useEffect, useState} from 'react';
import axiosInstance from "../axiosInstance";
import PageTitle from "../components/PageTitle";
import {Col, Form, Row} from "react-bootstrap";
import PlayerCard from "../components/PlayerCard";
import {FaArrowRight} from "react-icons/fa";
import useForm from "../hooks/useForm";

const MyTeam = () => {
    const [userTeamPlayers, setUserTeamPlayers] = useState([]);
    const [poruka, setPoruka] = useState('');
    const userTeam = JSON.parse(window.sessionStorage.getItem('userTeam'));
    const [playersInTeam, setPlayersInTeam] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const playersNotInTeam = allPlayers.filter(player => !playersInTeam.includes(player));

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axiosInstance.get('/teams')
            .then(response => {
                console.log(response.data);
                setTeams(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const {form, handleChange} = useForm({
        player1: '',
        player2: '',
    });

    const transfer = () => {
        let data  = {
            player1: form.player1,
            player2: form.player2,
            user_team_id: userTeam.id
        }

        axiosInstance.post('/transfer', data)
            .then(response => {
                console.log(response.data);
                setPoruka('Transfer successful');
            })
            .catch(error => {
                console.log(error);
                setPoruka(error.response.data.message);
            });
    }


    useEffect(() => {
        axiosInstance.get('/user-teams-players/' + userTeam.id)
            .then(response => {
                console.log(response.data);
                let userPlayers = response.data.data;
                setUserTeamPlayers(userPlayers);
                let playersinUse = userPlayers.map(player => player.player);
                setPlayersInTeam(playersinUse);
            })
            .catch(error => {
                console.log(error);
                setPoruka('No players in your team');
            });
    }, [userTeam.id]);

    useEffect(() => {
        axiosInstance.get('/players')
            .then(response => {
                console.log(response.data);
                setAllPlayers(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <PageTitle title="My team" subtitle={poruka} />
            <Row>
                {
                    userTeamPlayers.map(player => (
                        <Col key={player.id} md={4}>
                            <PlayerCard player={player.player} position={player.position} teams={teams}/>
                        </Col>
                    ))
                }
            </Row>
            <Row>
                <Col>
                    <h3>Transfer player</h3>
                </Col>
            </Row>
            <Row>
                <Col md={5}>
                    <Form.Group>
                        <Form.Label>Select player</Form.Label>
                        <Form.Control name="player1" onChange={handleChange} as="select">
                            {
                                playersInTeam && playersInTeam.map((player, index) => (
                                    <option key={index} value={player.id}>{player.player_name} ({player.player_position}) - {player.player_price}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>

                </Col>
                <Col md={5}>
                    <Form.Group>
                        <Form.Label>Select player</Form.Label>
                        <Form.Control name="player2" onChange={handleChange} as="select">
                            {
                                allPlayers && allPlayers.map((player, index) => (
                                    <option key={index} value={player.id}>{player.player_name} ({player.player_position}) - {player.player_price}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Transfer</Form.Label>
                        <br/>
                        <button onClick={transfer} className="btn btn-primary"><FaArrowRight /> Transfer</button>
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
};

export default MyTeam;