const express = require('express');
const dotenv = require('dotenv');
const app = express();
const Points = require('../Models/Point');
const Driver = require('../Models/Driver');
dotenv.config({path:'./config/config.env'});


 exports.getRoute = async (req, res,next) => {
    try {
        const { originPlace, destinationPlace,count } = req.body;
        console.log(originPlace,destinationPlace,count)
        const ridepickup = originPlace.split(" ").join("").toUpperCase();
        const droppickup = destinationPlace.split(" ").join("").toUpperCase();
        const pickupPoints = await Points.find({name:ridepickup});
        const dropPoints = await Points.find({name:droppickup});
        console.log(pickupPoints,dropPoints);
       return res.status(200).json({ pickupPoints,dropPoints,success:true });
    } catch (error) {
        next(error)
    }
};




