/* eslint-disable template-curly-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable quote-props */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-plusplus */
// import faker
const fake = require('faker');

const Promise = require('bluebird');
// import database
const db = require('./index.js');

const profileImg = [
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/adult-african-american-afro-black-female-1181519.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/adult-attractive-beautiful-beauty-415829.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/adult-beard-boy-casual-220453.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/adult-businessman-close-up-corporate-428364.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/close-up-photography-of-man-wearing-sunglasses-1212984.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/closeup-photo-of-smiling-woman-wearing-blue-denim-jacket-1130626.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/face-facial-hair-fine-looking-guy-614810.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/man-in-black-shirt-35065.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/man-in-red-jacket-1681010.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/man-wearing-black-zip-up-jacket-near-beach-smiling-at-the-736716.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/men-s-wearing-black-suit-jacket-and-pants-937481.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/photo-of-a-woman-smiling-1520760.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/photography-of-a-guy-wearing-green-shirt-1222271.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/portrait-photo-of-smiling-man-with-his-arms-crossed-standing-2379004.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/smiling-woman-wearing-black-sweater-1587009.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/woman-in-black-scoop-neck-shirt-smiling-38554.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/woman-smiling-at-the-camera-1181686.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/woman-wearing-coat-762020.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/woman-with-red-lips-leaning-on-green-garment-in-selective-1758845.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/women-s-white-and-black-button-up-collared-shirt-774909.jpg',
];


function randomDate() {
  const year = Math.floor(Math.random() * 5) + 2015;

  const month = Math.floor(Math.random() * 10) + 2;
  const monthString = (`0${  month}`);
  const day = Math.floor(Math.random() * 28) + 1;

  const dateString = (year + monthString + day);

  // eslint-disable-next-line radix
  const finalDate = parseInt(dateString);
  return finalDate;
}


function getNumOfReviews() {
  return Math.floor(Math.random() * 10) + 1;
}
function getNewUserId() {
  return Math.floor(Math.random() * 2000) + 1;
}

const configureDB = () => {
  Promise.promisifyAll(db.connection);
  // return db.connection.queryAsync('DROP DATABASE IF EXISTS squawk;')
  return db.connection.queryAsync('CREATE DATABASE IF NOT EXISTS squawk;')
    .then(() => {
      db.connection.queryAsync('CREATE DATABASE IF NOT EXISTS squawk;');
    })
    .then(() => {
      db.connection.queryAsync('USE squawk;');
    })
    .then(() => {
      // restaurants
      db.connection.queryAsync(`CREATE TABLE restaurants (
            id INTEGER AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(200) DEFAULT NULL
        );`);
    })
    .then(() => {
      // users
      db.connection.queryAsync(`CREATE TABLE users (
            user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(20) NOT NULL,
            profile_pic VARCHAR(300) DEFAULT NULL,
            reviews INTEGER DEFAULT 0,
            friends INT DEFAULT 0,
            photos INT DEFAULT 0,
            location VARCHAR(30)        
        );`);
    })
    .then(() => {
      // reviews
      db.connection.queryAsync(`CREATE TABLE reviews (
            review_id INTEGER AUTO_INCREMENT PRIMARY KEY,
            id_User INTEGER,
            id_Restaurants INTEGER,
            date INTEGER NOT NULL,
            rating INTEGER NOT NULL,
            body TEXT,
            useful_count INTEGER,
            cool_count INTEGER,
            funny_count INTEGER,
            check_ins INTEGER,
            useful_vote INTEGER DEFAULT 0,
            cool_vote INTEGER DEFAULT 0,
            funny_vote INTEGER DEFAULT 0
        );`);
    })
    .then(() => {
    // ADD CONSTRAINT FOREIGN KEY (id_User) REFERENCES users(user_id),
    // ADD CONSTRAINT FOREIGN KEY (id_Restaurants) REFERENCES restaurants(id)
      // images
    //   db.connection.queryAsync(`CREATE TABLE images (
    //         id INT AUTO_INCREMENT PRIMARY KEY,
    //         url VARCHAR(50),
    //         reviewID INT,
    //         FOREIGN KEY (reviewID) REFERENCES reviews(review_id)
    //         );`);
    })
    .then(() => {
      // populate restaurants
      // generate 100 fake restaurants
      for (let i = 1; i < 101; i++) {
        // create fake restaurant name
        const restaurantName = (fake.company.companyName());
        // insert new row into restaurants
        db.connection.query(`INSERT INTO restaurants (name) VALUES ("${restaurantName}")`);
      }
    })
    .then(() => {
      // populate users
      for (let i = 1; i < 2000; i++) {
        const username = `${fake.name.firstName()  } ${   fake.name.lastName()[0]  }.`;
        const pic = profileImg[i % 19];
        const reviews = fake.random.number({'min': 50, 'max': 1000});
        const friends = fake.random.number({'min': 50, 'max': 1000});
        const photos = fake.random.number({'min': 50, 'max': 1000});
        const location = (`${fake.address.city()  }, ${  fake.address.stateAbbr()}`);
        const queryString = `INSERT INTO users (name, profile_pic, reviews, friends, photos, location) VALUES ("${username}", "${pic}", "${reviews}", "${friends}", "${photos}", "${location}")`;
        db.connection.query(queryString);
      }
    })
    .then(() => {
      // populate reviews
      // generate random number of reviews for each restaurant
      for (let restaurantId = 1; restaurantId < 101; restaurantId++) {
        // create user collection to prevent repeats
        const usersCheckedIn = [];
        const numOfReviews = 100;// getNumOfReviews()
        for (let i = 0; i < numOfReviews; i++) {
          // generate a fake userId between 1 & 2000
          const currentUser = getNewUserId();
          // if the user has not reviewed the current restaurant
          if (!usersCheckedIn.includes(currentUser)) {
            // add the user to list of users that have checked in
            usersCheckedIn.push(currentUser);


            // FAKE DATE
            const fakeDate = randomDate();

            // generate a fake rating (integer 1 - 5)
            const rating = fake.random.number({'min': 1, 'max': 5});
            // generate a fake body of text
            // let numOfParagraphs = (Math.floor(Math.random() * 4) + 2)
            // let reviewBody = fake.lorem.paragraphs(numOfParagraphs)
            const reviewBody = fake.lorem.sentences(20);
            // let reviewBody = fake.lorem.sentences(10)
            // generate a fake "useful" count (0 - 4)
            const usefulCount = fake.random.number({'min': 1, 'max': 9});
            // generate a fake "funny" count (0 - 4)
            const funnyCount = fake.random.number({'min': 1, 'max': 6});
            // generate a fake "cool" count (0 - 4)
            const coolCount = fake.random.number({'min': 1, 'max': 3});
            const checkin = fake.random.number({'min': 0, 'max': 3});
            // EACH iteration: query db, insert into reviews

            const queryString = `INSERT INTO reviews (id_User, id_Restaurants, date, rating, body, useful_count, cool_count, funny_count, check_ins) VALUES ("${currentUser}", "${restaurantId}", "${fakeDate}", "${rating}", "${reviewBody}", "${usefulCount}", "${coolCount}", "${funnyCount}", "${checkin}")`;
            db.connection.query(queryString);
          }
        }
      }
    })
    .catch((err) => {
      console.log('ERROR: ', err);
    })
    .finally(() => {
      db.connection.end((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Connection closed');
        }
      });
    });
};

configureDB();
