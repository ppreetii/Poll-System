const pollServices = require("../services/poll");

exports.createPoll = async (req,res,next) =>{
    try {
      const poll = await pollServices.createPoll(req.body);
      res.status(201).json(poll);  
    } catch (error) {
        next(error);
    }
}

exports.getAllPolls = async (req,res,next) =>{
    try {
        const polls = await pollServices.getAllPolls();
        res.json(polls);
    } catch (error) {
        next(error);
    }
}

exports.getPoll = async (req,res,next) =>{
    try {
        const poll = await pollServices.getPoll(req.params.id);
        res.json(poll);
    } catch (error) {
        next(error);
    }
}

exports.updatePoll = async (req,res,next) =>{
    try {
        const poll = await pollServices.updatePoll(req.params.id, req.body);
        res.json(poll);
    } catch (error) {
        next(error);
    }
}