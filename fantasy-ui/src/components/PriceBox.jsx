import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from "react-bootstrap";

const PriceBox = props => {

    const {totalPricePlayers} = props;
    let variant = "success";
    if(totalPricePlayers > 100){
        variant = "danger";
    }

    return (
        <>
            <Alert className="text-center" variant={variant}>
                <Alert.Heading>Team Budget</Alert.Heading>
                <p>
                    { 100 - totalPricePlayers} remaining
                </p>
                <hr/>
                <p>
                    Please don't spend more than 100M, otherwise you won't be able to save your team.
                </p>
            </Alert>
        </>
    );
};

PriceBox.propTypes = {
    totalPricePlayers : PropTypes.number.isRequired
};

export default PriceBox;