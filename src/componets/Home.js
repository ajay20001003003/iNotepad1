import React from 'react'
// import { useContext } from 'react'
// import contextvalue from '../context/Notes/NoteContext'

import AddNote from './AddNote';
import Notes from './Notes';








const Home = (props) => {
    // const context = useContext(contextvalue);// use notecontext
    // const { notes, setnotes } = context;// destructuring 
    const { ShowAlert } = props;
    return (
        <>
            <AddNote ShowAlert={ShowAlert} />
            <Notes ShowAlert={ShowAlert} />



        </>
    )
}

export default Home
