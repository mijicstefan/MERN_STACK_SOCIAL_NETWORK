const express = require("express");
const User = require("../models/User");
const {  getUser, getUsers, createUser, deleteUser, updateUser, uploadPhoto, getUsersAdmin } = require("../controllers/users");
const advancedResults = require("../middleware/advancedResults");


const router = express.Router({ mergeParams: true });
//Middleware za zastitu rute i za autorizaciju u zavisnosti od roles.
const { protect, authorize } = require("../middleware/auth");
//Routing
router
    .route("/:id")
    .get(protect, getUser)
    .delete(protect, authorize('admin', 'user', 'teacher'), deleteUser)
    .put(protect, authorize('admin', 'user', 'teacher'), updateUser);

router
    .route("/")
    .post(protect, authorize('admin'), createUser)
    .get(protect, authorize('admin', 'user', 'teacher'), getUsers);


router
    .route('/admin').get(protect, authorize('admin'), getUsersAdmin);    


module.exports = router;