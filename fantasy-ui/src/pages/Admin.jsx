import React, {useEffect, useState} from 'react';
import PageTitle from "../components/PageTitle";
import {Col, Row, Table} from "react-bootstrap";
import axiosInstance from "../axiosInstance";

const Admin = () => {
    const [poruka, setPoruka] = useState('');
    const [url, setUrl] = useState('/pagination');
    const [players, setPlayers] = useState([]);
    const [links, setLinks] = useState([]);


    useEffect(() => {
        axiosInstance.get(url)
            .then(response => {
                console.log(response.data);
                setPlayers(response.data.data.data);
                if (links.length === 0) {
                    let linksForPagination = response.data.data.links;
                    let linksArray = linksForPagination.map(link => {
                        if (link.label === '&laquo; Previous') {
                            return {label: 'Previous', url: link.url};
                        }
                        if (link.label === 'Next &raquo;') {
                            return {label: 'Next', url: link.url};
                        }

                        return {
                            label: link.label,
                            url: link.url
                        };
                    });

                    setLinks(linksArray);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [links.length, url]);

    return (
        <>
            <PageTitle title="Admin pages" subtitle={poruka} />

            <Row>
                <Table hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Player name</th>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {players && players.map(player => (
                            <tr key={player.id}>
                                <td>{player.id}</td>
                                <td>{player.player_name}</td>
                                <td>{player.player_position}</td>
                                <td>{player.team_name}</td>
                                <td>{player.player_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>

            <Row>
                <Col>
                    {
                        links && links.map((link, index) => (
                            <button className="m-1 btn btn-primary" key={index} onClick={() => setUrl(link.url)}>{
                                link.label
                            }</button>
                        ))
                    }
                </Col>
            </Row>
        </>
    );
};

export default Admin;