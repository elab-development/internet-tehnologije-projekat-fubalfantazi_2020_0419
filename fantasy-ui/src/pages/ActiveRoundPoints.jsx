import React, {useEffect, useState} from 'react';
import PageTitle from "../components/PageTitle";
import axiosInstance from "../axiosInstance";
import {Alert, Col, Row} from "react-bootstrap";
import PointsPerRound from "../components/PointsPerRound";
const ActiveRoundPoints = () => {
    const [activeRound, setActiveRound] = useState(null);
    const [poruka, setPoruka] = useState('');
    const [playerPointsPerRoundActive, setPlayerPointsPerRoundActive] = useState([]);

    useEffect(() => {

        axiosInstance.get('/active-round')
            .then(response => {
                console.log(response.data);
                setActiveRound(response.data.data);
            })
            .catch(error => {
                console.log(error);
                setPoruka(error.response.data.message);
            });

    }, []);


    useEffect(() => {

        if (activeRound !== null) {
            axiosInstance.get('/points-per-round/' + activeRound.id)
                .then(response => {
                    console.log(response.data);
                    setPlayerPointsPerRoundActive(response.data.data);
                })
                .catch(error => {
                    console.log(error);
                    setPoruka(error.response.data.message);
                });
        }

    }, [activeRound]);

    return (
        <>
            <PageTitle title="Active Round points" subtitle={poruka} />
            <Row>
                {
                    activeRound !== null && (
                        <>
                            <Col md={6}>
                                <Alert variant="info">
                                    <p>{activeRound.round_name}</p>
                                    <p>Points for round {activeRound.round_number}</p>
                                    <p>Total points</p>
                                    <h1>{playerPointsPerRoundActive ? playerPointsPerRoundActive.reduce((acc, player) => acc + player.points, 0) : 0}</h1>
                                </Alert>
                            </Col>
                            <Col md={6}>
                                {
                                playerPointsPerRoundActive.length > 0 && (
                                        <PointsPerRound playerData={playerPointsPerRoundActive} />
                                    )
                                }
                            </Col>
                        </>
                    )
                }

                {
                    activeRound === null && (
                        <>
                            <h1>No active round</h1>
                        </>
                    )
                }
            </Row>
        </>
    );
};

export default ActiveRoundPoints;