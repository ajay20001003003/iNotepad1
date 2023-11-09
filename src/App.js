
import './App.css';
import About from './componets/About';
import Home from './componets/Home';
import Navbar from './componets/Navbar';
import {
  BrowserRouter,

  Routes,

  Route
} from "react-router-dom";
import NoteState from './context/Notes/NoteState';
import Alert from './componets/Alert';
import Signup from './componets/Signup';
import Login from './componets/Login';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null);
  const ShowAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }
  return (
    <>


      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div div className="container">


            <Routes>


              <Route exact path='/' element={<Home ShowAlert={ShowAlert} />}></Route>
              <Route exact path='/login' element={<Login ShowAlert={ShowAlert} />}></Route>
              <Route exact path='/signup' element={<Signup ShowAlert={ShowAlert} />}></Route>
              <Route exact path='/about' element={<About />}></Route>
            </Routes>

          </div>





        </BrowserRouter>
      </NoteState>



    </>
  );
}

export default App;
