import React, {useEffect, useState} from 'react';
import axiosInstance from "../axiosInstance";
import {Chart} from "react-google-charts";

const Grafik = () => {
    const userTeam = JSON.parse(window.sessionStorage.getItem('userTeam'));
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axiosInstance.post('/grafik/', {
            user_team_id: userTeam.id
        })
            .then(response => {
                console.log(response.data);
                let data = response.data.data;
                let chart = [['Player', 'Points']];

                data.forEach(player => {
                    chart.push([player.player_name, parseInt(player.total_points)]);
                });

                setChartData(chart);
            })
            .catch(error => {
                console.log(error);
            });
    }, [userTeam.id]);

    return (
        <>
            {
                chartData.length > 0 && (
                    <Chart
                        chartType="PieChart"
                        width="100%"
                        height="400px"
                        data={chartData}
                        options={{
                            title: 'Points per player',
                        }}
                    />
                )
            }
        </>
    );
};

export default Grafik;