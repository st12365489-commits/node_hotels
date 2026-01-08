const express = require('express');
const router = express.Router();

const Person = require( './../models/person');

//POST route to create a new person

router.post('/persons', async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();

    console.log('Person saved successfully:', savedPerson);
    res.status(201).json(savedPerson);

  } catch (err) {
    console.error('Error saving person:', err);
    res.status(500).json({ error: 'Error saving person' });
  }
})
//GET method to get the person
router.get('/persons', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Persons retrieved successfully:', data);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error retrieving persons:', err);
    res.status(500).json ({ error: 'Error retrieving persons' });
  }
}) 

//work type filter
router.get('/persons/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if(workType== 'chef' || workType=='waiter' || workType=='manager'){
      const response = await Person.find({work:workType});
      console.log(`Persons with work type ${workType} retrieved successfully:`, response);
      res.status(200).json(response);
    }
    else{
      res.status(400).json({ error: 'Invalid work type' });
    }
  } catch (err) {
    console.error('Error retrieving persons by work type:', err);
    res.status(500).json({ error: 'Error retrieving persons by work type' });
    }
})
//
router.put('/persons/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updateData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Person updated successfully:', response);
    res.status(200).json(response);

  } catch (err) {
    console.error('Error updating person:', err);
    res.status(500).json({ error: 'Error updating person' });
  }
});

//delete person by id
// DELETE person by ID
router.delete('/persons/:id', async (req, res) => {
  try {
    const personId = req.params.id;

    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Person deleted successfully:', deletedPerson);
    res.status(200).json({
      message: 'Person deleted successfully',
      data: deletedPerson
    });

  } catch (err) {
    console.error('Error deleting person:', err);
    res.status(500).json({ error: 'Error deleting person' });
  }
});


module.exports = router;
