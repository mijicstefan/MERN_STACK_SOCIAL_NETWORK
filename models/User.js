const crypto = require('crypto');
const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name.'],
        trim: true,
        maxlength:[50, 'Name can no be longer than 50 characters.']
    },
    slug: String,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    email: {
        type: String,
        required: [true, 'Please add an email.'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email.'
        ]
    },
    role: {
        type: String,
        enum: ['user', 'teacher'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add a password.'],
        minlength: 8,
        maxlength: 16,
        select: false
    },
    phone: {
        type: String,
        maxlength: [15, 'Phone number can not be longer than 15 characters.']
    },
    // address: {
    //     type: String,
    //     required: [true, 'Please add an address!']
    // },
    biography: {
        type: String,
        required: false,
        maxlength: [500, "Biography can no be longer than 500 characters."]

    },
    location: {
        // GeoJSON Point
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    hourlyRate: mongoose.Schema.Types.Mixed,
    monthlyPaycheck: mongoose.Schema.Types.Mixed,
    monthlyHours: mongoose.Schema.Types.Mixed,
    totalEarnings: mongoose.Schema.Types.Mixed,
    totalHours: mongoose.Schema.Types.Mixed,
    resetPasswordToken: String,
    resetPasswordExpire: Date,


}, 
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
);

//Create user slug from the name
UserSchema.pre('save', function(next){
    this.slug = slugify(this.name, { lower: true });
    next();
});

//Create user slug from the name
UserSchema.pre('save', function(next){
    if(this.role === 'teacher') {
        this.hourlyRate = 50;
        this.monthlyHours = 0;
        this.monthlyPaycheck = this.hourlyRate * this.monthlyHours;
        this.totalHours = 0;
        this.totalHours += this.monthlyHours;
        this.totalEarnings = 0;
        this.totalEarnings = this.totalHours * this.hourlyRate;
    }
    next();
});


//Geocode and create location field
// UserSchema.pre('save', async function(next){
//     const loc = await geocoder.geocode(this.address);
//     this.location = {
//         type: "Point",
//         coordinates: [loc[0].longitude, loc[0].latitude],
//         formattedAddress: loc[0].formattedAddress,
//         street: loc[0].streetName,
//         city: loc[0].city,
//         state: loc[0].stateCode,
//         zipcode: loc[0].zipcode,
//         country: loc[0].countryCode
//     };

//     //Do not save address in db after getting all this data from it.
//     this.address = undefined;
//     next();
// });


//Encrypt passwwrod using bcrypt
UserSchema.pre('save', async function(next) {

    if(!this.isModified('password')){
        next();
    }

    //This will run only if the password is modified.
    const salt = await bcrypt.genSalt(10);
    this.password  = await bcrypt.hash(this.password, salt);

});

//Sign JWT and return
//This is a method function, which is called on  a object return from a model.
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword){
    //We can use this.password because this is going to be called on an actual user reference in controller
    //and this refers to returned user itself
    return await bcrypt.compare(enteredPassword, this.password);
};

//Gnerate and hash password token
UserSchema.methods.getResetPasswordToken = function() {
    //Generate the token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    //Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;

}



module.exports = mongoose.model("User", UserSchema);


