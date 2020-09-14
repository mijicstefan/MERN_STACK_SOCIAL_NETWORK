import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import img from "../../img/undraw_welcome_cats_thqn.svg";

function FeedPage(props) {
    return (
        <div>
            <Grid container>
                <Grid item xs={6}>
                    <img src={img}/>
                </Grid>
            </Grid>
        </div>
    )
}

FeedPage.propTypes = {

}

export default FeedPage

