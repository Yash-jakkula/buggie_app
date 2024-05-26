const express = require('express');
const router = express.Router();
const {getallStudents,
     getallDrivers, userLogin,
    userLogout, 
    getUser} = require('../controllers/Auth');
const{protect,authorize, extractUserDetailsFromToken} = require('../Middleware/auth');



router.get('/getallstudents',getallStudents);

router.get('/getalldrivers',getallDrivers);

router.post('/userlogin',userLogin);

router.get('/userlogout',userLogout);

 router.get('/presentuser',extractUserDetailsFromToken,getUser);

// router.post('/studentlogin',studentLogin);

// router.get('/studentlogout',studentLogout);

// router.post('/driverlogin',driverLogin);

// router.get('/driverlogout',driverLogout);

module.exports = router;