import React from 'react'
import { Grid, Typography } from '@material-ui/core'

export default function Blogs() {
    return (
        <div>
            <Grid alignContent='center' container spacing={3}>
                <Grid item alignContent='center' xs={6}>
                    <Typography align='center' variant='h2'>POST NAME</Typography>
                </Grid>
            </Grid>
        </div>
    )
}
