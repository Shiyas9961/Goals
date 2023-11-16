const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals = asyncHandler( async (req,res) => {
    try{
        const goals = await Goal.find({user : req.user.id})
        res.status(200).json(goals)
    }catch(err){
        res.status(200).json({error:err.message})
    }
})

const postGoal = asyncHandler( async (req,res) => {
    if(!req.body){
        res.status(400)
        throw new Error('Please provide text')
    }
    try{
        const goal = await Goal.create({
            text : req.body.text,
            user : req.user.id
        })
        res.status(200).json(goal)
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

const putGoal = asyncHandler( async (req,res) => {
    const {id} = req.params
    try{
        const goal = await Goal.findByIdAndUpdate(id,{text:req.body.text})
        if(!goal){
            res.status(400)
            throw new Error("Can't update")
        }
        if(!req.user){
            res.status(400)
            throw new Error('User not found')
        }
        if( goal.user.toString() !== req.user.id ){
            res.status(400)
            throw new Error('User not autherised')
        }
        res.status(200).json(goal)
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

const deleteGoal = asyncHandler( async (req,res) => {
    const {id} = req.params
    try{
        const goal = await Goal.findByIdAndDelete(id)
        if(!goal){
            res.status(400)
            throw new Error('Goal not found')
        }
        if(!req.user){
            res.status(400)
            throw new Error('User not found')
        }
        if(req.user.id !== goal.user.toString()){
            res.status(400)
            throw new Error('User not autherised')
        }
        res.status(200).json({message:'Successfully deleted'})
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

module.exports = {
    getGoals,
    postGoal,
    putGoal,
    deleteGoal
}