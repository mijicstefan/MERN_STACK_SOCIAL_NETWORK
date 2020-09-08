import React from 'react'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";

function GreetingMessage({ userName }) {
    return (
        <div>
            <Typography align="center" variant="h4">
                Hoooray! {userName}, Welcome to UpSpot!
            </Typography>
            <Typography align="center" variant="h4">
                What are we learning today?
            </Typography>
        </div>
    )
}

GreetingMessage.propTypes = {
    userName: PropTypes.string,
}

const mapStateToProps = state => ({
    userName: state.auth.user.data.name
});

export default connect(mapStateToProps, {})(GreetingMessage);

