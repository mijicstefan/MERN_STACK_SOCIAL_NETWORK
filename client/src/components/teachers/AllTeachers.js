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

  useEffect(() => {
    loadTeachers();
  }, []);
  
  console.log('all teacheeers');
  return (
    <div>
      <Grid container spacing={3}>
        {teachers && teachers.map((teacher) => (
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
  teachers: state?.teachers?.teachers?.data,
  teachersDependency: state?.teachers,
  loading: state?.teachers?.loading,
});

export default connect(mapStateToProps, { loadTeachers })(AllTeachers);
