import React, { useState } from 'react'




import { useContext } from 'react'
import contextvalue from '../context/Notes/NoteContext'



const AddNote = (props) => {



    const context = useContext(contextvalue);
    const { addnote } = context;
    const [notes, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addnote(notes.title, notes.description, notes.tag);
        setNote({ title: "", description: "", tag: "" })
        //showAlert("added note successfully", "success")

    }
    const onchange = (e) => {


        setNote({ ...notes, [e.target.name]: e.target.value })

    }
    return (
        <div>
            <div className="conatiner my-3">



                <h2>Add a Note</h2>


                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input minLength={5} required type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={notes.title} onChange={onchange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input minLength={5} required type="text" className="form-control" id="description" name='description' value={notes.description} onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input required type="text" className="form-control" id="tag" name='tag' value={notes.tag} onChange={onchange} />
                    </div>

                    <button disabled={notes.title.length < 5 || notes.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
                {/* <Notes /> */}

            </div>
        </div>
    )
}

export default AddNote
