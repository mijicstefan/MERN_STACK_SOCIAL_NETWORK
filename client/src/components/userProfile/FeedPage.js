import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import img from "../../img/undraw_welcoming_xvuq.svg";

function FeedPage(props) {
    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <img src={img}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography color='textPrimary' variant='h3'>Welcome to UpSpot, a place where you can speak your mind freely.</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

FeedPage.propTypes = {

}

export default FeedPage

