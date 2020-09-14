const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const User = require('./models/User');
const Blog = require('./models/Blog');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const blogs = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/blogs.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    console.log('Users imported'.green.inverse);

    // await Blog.create(blogs);
    // console.log('Blogs imported'.green.inverse);

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Users Destroyed...'.red.inverse);

    await Blog.deleteMany();
    console.log('Blogs Destroyed...'.red.inverse);

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
};

