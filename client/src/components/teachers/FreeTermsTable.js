import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('9 AM', '9:55 AM', 6.0, 24),
  createData('10 AM', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
];

export default function AcccessibleTable({ teacher }) {
  const classes = useStyles();


  const handleReservation = e => {
      console.log('Reservation sent.');
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>Open terms for today</caption>
        <TableHead>
          <TableRow>
            <TableCell>Starting at:</TableCell>
            <TableCell align="right">Ending at:</TableCell>
            <TableCell align="right">Price for Session:</TableCell>
            <TableCell align="right">Make a reservation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{teacher.hourlyRate} &euro;</TableCell>
              <TableCell align="right"><Button onClick={e => handleReservation()} color='secondary' variant='contained'>Reserve</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
