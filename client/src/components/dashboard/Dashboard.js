import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { loadUser } from "../../actions/auth";
import Sidebar from '../sidebar/Sidebar';
import DataForm from "../userProfile/DataForm";




const Dashboard = ({ getCurrentProfile, auth, profile, loadUser }) => {

    // useEffect(() => {
    //     loadUser();
    //     getCurrentProfile();
        

    // }, []);

    return (
        <div>
            <Sidebar/>
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    loadUser: PropTypes.func
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, loadUser})(Dashboard);


