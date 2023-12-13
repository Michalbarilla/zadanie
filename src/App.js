import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Categories from "./components/Categories";
import {Gallery} from "./components/Gallery";

const theme = extendTheme({
    fonts: {
        heading: `'Barlow', sans-serif`,
        body: `'Barlow', sans-serif`,
    },
});

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Categories />} />
                    <Route path="/gallery/:category" element={<Gallery />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}


export default App;