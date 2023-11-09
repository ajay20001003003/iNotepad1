import React
    from "react";
import NoteContext

    from "./NoteContext";
import { useState } from "react";




const NoteState = (props) => {

    const host = "http://localhost:5000"


    const notesintial = [];
    const [notes, setNotes] = useState(notesintial);

    // add a note

    const getallNotes = async () => {
        const response = await fetch(`${host}/api/notes//fetchnotes/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')


            },

        });
        const json = await response.json();

        setNotes(json);

    };


    const addnote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",

                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();


        setNotes(notes.concat(note))
    }

    // const addnote = async (title, description, tag) => {
    //     //console.log("adding a new note");



    //     const response = await fetch(`${host}/api/notes/addnote/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "auth-token": localStorage.getItem('token')


    //         },
    //         body: JSON.stringify({ title, description, tag })
    //     });


    //     const note = {
    //         "_id": "654b154f13330fc863wf1dcsxfc40201a9",
    //         "user": "6549e9ff9356cef0zze3280e82",
    //         "title": title,
    //         "description": description,
    //         "tag": tag,
    //         "date": "2023-11-08T04:57:51.454Z",
    //         "__v": 0

    //     }
    //     setNotes(notes.concat(note));

    // }

    // delete a note

    const deletenote = async (id) => {

        const response = await fetch(`${host}/api/notes/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')


            },

        });
        //const json = response.json();
        // console.log(json);


        //console.log("delete note call" + id);
        const newNote = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNote);
    }

    // edit a note
    const editNote = async (id, title, description, tag) => {

        /// //api caall
        //logic to edit in client

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')


            },
            body: JSON.stringify({ title, description, tag })
        });

        // const json = await response.json();
        // console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes))





        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }

        setNotes(newNotes);

    }

    return (
        //<NoteContext.Provider value={{ state: state, update: update }}>
        <NoteContext.Provider value={{ notes, setNotes, addnote, deletenote, getallNotes, editNote }}>

            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;