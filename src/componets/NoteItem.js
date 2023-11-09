import React from 'react'
import { useContext } from 'react'
import contextvalue from '../context/Notes/NoteContext'


const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(contextvalue);// use notecontext
    const { deletenote } = context;// destructuring


    return (



        // yaha par error aa rha hai



        <div className="col-md-3" >
            <div className="card my-3" >

                <div className="card-body ">

                    <div className="d-flex align-item-center">
                        <h5 className="card-title">{note.title}


                            <i className="fa-regular fa-trash-can mx-2" onClick={() => { deletenote(note._id) }} ></i>
                            <i className="fa-solid fa-pen-to-square" onClick={() => { updateNote(note) }}></i>

                        </h5>






                        {/* <button onClick={() => { deletenote(note._id) }}>click</button> */}
                        {/* <button onClick={() => { updateNote(note) }}>edit</button> */}
                    </div>
                    <h6 className="card-title">{note.tag}</h6>


                    <p className="card-text">{note.description}</p>


                </div>
            </div>
        </div >


    )
}

export default NoteItem;
