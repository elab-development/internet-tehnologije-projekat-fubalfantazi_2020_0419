import React, {useEffect, useState} from 'react';
import {Alert, Col, Row} from "react-bootstrap";
import axiosInstance from "../axiosInstance";
import Grafik from "./Grafik";

const TotalPointsBox = () => {
    const [userTeamUpdated, setUserTeamUpdated] = useState(null);

    useEffect(() => {
        axiosInstance.get('/user-team')
            .then(response => {
                console.log(response.data);
                setUserTeamUpdated(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <Row>
                <Col md={6}>
                    <Grafik />
                </Col>
                <Col md={6}>
                {
                    userTeamUpdated !== null && (
                        <Alert variant="success">
                            <h1>{userTeamUpdated.team_name}</h1>
                            <h2>{userTeamUpdated.total_points} points</h2>
                        </Alert>
                    )
                }
                </Col>
            </Row>
        </>
    );
};

export default TotalPointsBox;