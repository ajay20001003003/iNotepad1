const express = require('express')
const router = express.Router();
const User = require('../models/User')// impoterd the schema
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { json } = require('react-router-dom');

const jwt_secret = "kritikadolly"

// crete a user using post /api/auth/ does not requre auth

// router.get('/', (req, res) => {
//     // obj = {
//     //     name: 'ajay',
//     //     mobile: 63883873

//     // }
//     // res.json(obj)
//     console.log(req.body);
//     res.send(req.body);
// }) 

router.post('/createuser', [

    // here we check validator
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid name').isEmail(),
    // password must be at least 5 chars long
    //  body('password', 'password must be atleast 5 charecter').isLength({ min: 5 }),

], async (req, res) => {
    // intiallly we validate the format of req body
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {


        let user = await User.findOne({ email: req.body.email });// check wheather the user with this email is exist or not
        if (user) {
            return res.status(400).json({ success, error: "sorry a with this email is already exist" });
        }
        // after the verfiying the database that same user is not exist then we are genaratinvg the password

        const salt = await bcrypt.genSalt(10);// here we genarte the salt for hash
        const secpassword = await bcrypt.hash(req.body.password, salt)// here we encrypta the password


        // new user crete here
        user = await User.create({
            name: req.body.name,
            password: secpassword,
            email: req.body.email
        })



        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, jwt_secret);
        success = true
        // console.log(jwtdata);
        res.json({ success, authtoken })
        //console.log(json.success);
    }

    // if any error occured 

    catch (error) {
        console.log(error.message);
        res.status(500).send(success, 'some error occured');
    }

    // then(user => res.json(user))
    //     .catch(err => {
    //         console.log(err)
    //         res.json({ error: 'please enter a unique value for email' });
    //     })
})
// authentication  a user using :post:/api/auth/login" no login is required



router.post('/login', [
    // body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid name').isEmail(),
    // password must be at least 5 chars long
    body('password', 'password cannot be blank').exists()

]




    , async (req, res) => {
        let success = false;


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {

            let user = await User.findOne({ email });// her we find the user in data base from user db

            if (!user) {// if user not found means user user does not exist
                return res.status(400).json({ errors: "Please try to login with correct credentials" });

            }

            const passwordcompare = await bcrypt.compare(password, user.password)// return true or false  user.password means we abstarct the password from user database

            if (!passwordcompare) {
                success = false
                return res.status(400).json({ errors: "Please try to login with correct credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, jwt_secret)// here we genarate the token after comparing the the password 


            success = true;
            res.json({ success, authtoken })

        } catch (error) {


            console.log(error.message);
            res.status(500).send('some error occured');
        }



    });


// Route 3/// get loogin detail using post :/api/auth/getuser: login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {


        userId = req.user.id;
        const user = await User.findById(userId).select("-password");// fetch all the information except password
        res.send(user);


    } catch (error) {
        console.log(error.message);
        res.status(500).send('some error occured');
    }
})

module.exports = router