const express = require('express');
const router = express.Router();
const TaskBoard = require('../models/taskBoard');

//Putting all specific mutations off onto more frontend,
//Similar logic to React where the whole variable needs to be updated
//Nothing gets changed in place


/** 
 * Returns all boards, needed for displaying all there names
 * GET /api/boards
**/
router.get('/boards', async (req, res) => {
    try {
        const boards = await TaskBoard.find();
        res.status(200).json(boards);
    } catch (e) {
        console.error('Error fetching TaskBoards: ', e);
        res.status(500).json({error: 'Error fetching TaskBoards'});
    }
});

/** 
 * Returns a specific board by name
 * GET /api/boards/:name
**/
router.get('/boards/:_id', async (req, res) => {
    try {
        const board = await TaskBoard.findById(req.params._id);
        if(!board)
            { return res.status(404).json({error:'Board not Found'}) };
        res.status(200).json(board);
    } catch (e) {
        console.error('Error fetching TaskBoards: ', e);
        res.status(400).json({error: 'Invalid task board name'});
    }
});

/**
 * Saves a new TaskBoard
 * POST /api/boards
 */
router.post('/boards', async (req, res) => {
    try {
        const newBoard = new TaskBoard(req.body);
        await newBoard.save();
        res.status(201).json(newBoard);
    } catch (err) {
        console.error('Error adding TaskBoard:', err);
        res.status(400).json({ error: 'Invalid data' });
    }
});

/**
 * Updates a TaskBoard
 * PUT /api/boards
 */
router.put('/boards', async (req, res) => {
    try {
        const updatedBoard = await TaskBoard.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
            runValidators: true
        });
  
        if (!updatedBoard) 
            {return res.status(404).json({ error: 'Board not found' });}
  
        res.status(200).json(updatedBoard);
    } catch (err) {
        console.error('Error updating board:', err);
        res.status(400).json({ error: 'Invalid update data' });
    }
});

/**
 * Delete a TaskBoard
 * DELETE /api/boards/:name
 */
router.delete('/boards/:id', async (req, res) => {
    try {
        //DEBUGGING DELETE BUTTON
      console.log("Attempting to delete board with ID:", req.params.id);
  
      const board = await TaskBoard.findByIdAndDelete(req.params.id); // ✅ correct model
  
      if (!board) {
        console.log("Board not found");
        return res.status(404).json({ message: 'Board not found' });
      }
  
      console.log("Board deleted:", board);
      res.status(200).json({ message: 'Board deleted successfully' });
    } catch (err) {
      console.error('Error deleting board:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  

module.exports = router;