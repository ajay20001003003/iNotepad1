const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

router.get('/fetchnotes', fetchuser, async (req, res) => {


    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);


})

router.post('/addnote', fetchuser, [
    body('title', 'Enter a title name').isLength({ min: 3 }),
    body('description', 'Enter a description').isLength({ min: 10 }),
    // body('tag','enter a tag ').isLength({min:5}),
    // password must be at least 5 chars long
    // body('password', 'password must be atleast 5 charecter').isLength({ min: 5 }),

], async (req, res) => {


    try {



        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const addnotes = new Notes({
            title, description, tag, user: req.user.id,
        })
        const savenote = await addnotes.save();
        res.send(savenote);
    }

    catch (error) {
        console.log(error.message);
        res.status(500).send('some error occured');
    }


})


// route 3 updating the existing note
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {

        const { title, description, tag } = req.body;// here we fetch the data from the request body
        const newnote = {};// create a new empty object
        if (title) {//if the user give  the title in the requet body
            newnote.title = title
        }
        if (description) {// if the user give description for update
            newnote.description = description
        }
        if (tag) {// if the user give tag name for update
            newnote.tag = tag;
        }

        // find the node to be updata
        let note = await Notes.findById(req.params.id);// WE CHECK THAT EITHER THEY EXIST OR NOT
        if (!note) {
            return res.status(404).send('Not found')
        }

        if (note.user.toString() !== req.user.id) {// if the users are not same 
            return res.status(401).send("not allowed");
        }


        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json({ note });





    });

// route 4 delete the notes //api/notes/delete/id; in existing notes login required


router.delete('/delete/:id', fetchuser, async (req, res) => {

    let note = await Notes.findById(req.params.id);

    // we check that wheather the this id is exist or not in the database

    if (!note) {
        return res.status(401).send('not allowed to access')
    }

    // we verify that use own this note

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send('not allowed');
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "success": "notes has been deleted" });




})



module.exports = router