import React, {useEffect, useState} from 'react';
import axiosInstance from "../axiosInstance";
import {Image, Row} from "react-bootstrap";

const ManagerOfTheMonth = () => {
    const [managerOfTheMonth, setManagerOfTheMonth] = useState(null);
    useEffect(() => {
        axiosInstance.get('https://randomuser.me/api/')
            .then(response => {

                let data = {
                    name: response.data.results[0].name.first + ' ' + response.data.results[0].name.last,
                    image: response.data.results[0].picture.large,
                    email: response.data.results[0].email,
                    points: Math.floor(Math.random() * 500)
                }

                console.log(response.data);
                setManagerOfTheMonth(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <Row className="mt-3">
                {
                    managerOfTheMonth !== null && (
                        <div className="col-md-6">
                            <div className="card">
                                <img src={managerOfTheMonth.image} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{managerOfTheMonth.name}</h5>
                                    <p className="card-text">Email: {managerOfTheMonth.email}</p>
                                    <p className="card-text">Points: {managerOfTheMonth.points}</p>
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className="col-md-6">
                    <h1>Manager of the month</h1>
                    <Image src="https://i2-prod.mirror.co.uk/incoming/article12502690.ece/ALTERNATES/s1200b/Premier-League-Manager-of-the-Month-Award-is-Presented-to-Antonio-Conte.jpg" className="img-fluid" alt="Manager of the month" />
                    <p>
                        The Manager of the Month is an association football award that recognises the manager adjudged best for each month of the season in the English Premier League.
                    </p>
                </div>
            </Row>
        </>
    );
};

export default ManagerOfTheMonth;