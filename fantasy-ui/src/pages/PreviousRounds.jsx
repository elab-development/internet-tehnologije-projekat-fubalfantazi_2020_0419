import React, {useEffect, useState} from 'react';
import PageTitle from "../components/PageTitle";
import axiosInstance from "../axiosInstance";
import {Col, ListGroup, Row} from "react-bootstrap";
import PointsPerRound from "../components/PointsPerRound";
import pointsPerRound from "../components/PointsPerRound";

const PreviousRounds = () => {
    const [poruka, setPoruka] = useState('');
    const [endedRounds, setEndedRounds] = useState([]);
    const [chosenRound, setChosenRound] = useState(null);
    const [roundPoints, setRoundPoints] = useState([]);

    useEffect(() => {
        axiosInstance.get('/ended-rounds')
            .then(response => {
                console.log(response.data);
                setEndedRounds(response.data.data);
            })
            .catch(error => {
                console.log(error);
                setPoruka(error.response.data.message);
            });
    }, []);

    useEffect(() => {
        if (chosenRound !== null) {
            axiosInstance.get('/points-per-round/' + chosenRound)
                .then(response => {
                    console.log(chosenRound);
                    console.log(response.data);
                    setRoundPoints(response.data.data);
                })
                .catch(error => {
                    console.log(error);
                    setPoruka(error.response.data.message);
                });
        }
    }, [chosenRound]);

    return (
        <>
            <PageTitle title="Previous rounds" subtitle={poruka} />
            <Row>
                <Col md={6}>
                    <ListGroup as="ul">
                        {endedRounds && endedRounds.map(round => (
                            <ListGroup.Item onClick={() => setChosenRound(round.id)} as="li" key={round.id}>
                                {round.round_name} -> Click to see points
                            </ListGroup.Item>
                        ))}
                      </ListGroup>
                </Col>
                <Col md={6}>
                    {chosenRound !== null && roundPoints.length > 0 && (
                        <PointsPerRound playerData={roundPoints} />
                    )}
                </Col>
            </Row>
        </>
    );
};

export default PreviousRounds;