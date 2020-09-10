import React, { useEffect } from "react";
import PropTypes from "prop-types";
import TeacherCard from "./TeacherCard";
import { loadTeachers } from "../../actions/teachers";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

const AllTeachers = ({
  loadTeachers,
  teachers,
  teachersDependency,
  loading,
}) => {

  //Kako da loadujem resurs sa servera sa 
  //useEffect hookom?
  //Zelim da kad god se ovori ova stranica sa ovom AllTeachers komponentom
  //da se pozove GET /api/v1/v1/teachers
  //Action sam napravio gdje se API call odvija, i redux state postoji,
  //ali i pored drugog parametra dole u useState Hooku, prazne zagrade,
  ///API SE stalno poziva jer se konponenta nekako konsatno renderuje,
  //a koliko sam shvatio, useEffect je kao ComponentDidMaount, govori sta se radi kad se 
  //komponenta uglavi u DOM.
  //Glavno pitanje je zasto se ova komponenta stalno renderuje i samim tim svaki put poziva 
  //loadTeachers akciju?
  //Ovo sam zaobisao tako sto sam pozvao loadTeachers() akciju u App.js pomocu useEffecta, ali ovdje ne radi..
  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        {teachers.map((teacher) => (
          <Grid item xs={6}>
            <TeacherCard
              key={teacher.email}
              loading={loading}
              name={teacher.name}
              biography={teacher.biography}
              joinedAt={teacher.createdAt}
              teacher={teacher}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

AllTeachers.propTypes = {
  loadTeachers: PropTypes.func.isRequired,
  teachersDependency: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  teachers: state.teachers.teachers.data,
  teachersDependency: state.teachers,
  loading: state.teachers.loading,
});

export default connect(mapStateToProps, { loadTeachers })(AllTeachers);
