import React, { useEffect } from "react";

import { AnimatePresence } from "framer-motion"
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router-dom";
import MainPage from './pages/MainPage'
import OpeningPage from './pages/OpeningPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';



function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
          // Check if the event key is 'r' and the Ctrl or Command key is pressed
          if ((event.key === 'r' || event.key === 'R') && (event.ctrlKey || event.metaKey)) {
            event.preventDefault(); // Prevent the default browser reload behavior
            navigate('/'); // Navigate to the root path ("/")
            window.location.reload(); // Reload the page
          }
        };
    
        // Add the event listener when the component mounts
        window.addEventListener('keydown', handleKeyDown);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [navigate]);

    return (
        <>

                <AnimatePresence>
                    <Routes>

                        <Route path='/' element={<OpeningPage/>} />

                        <Route path='/main'  element={<MainPage/>}/>
                        
                    </Routes>
                </AnimatePresence>

        </>
    )
}

export default App
