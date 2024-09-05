import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Notes from './Notes';
import { SearchProvider } from '../Context/SerachProvider';
import DepartmentForm from './DepartmentForm';
import Login from './Login';
import ChapterForm from './ChapterForm';


function Router() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path='/add' element={<DepartmentForm />} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Chapter' element={<ChapterForm/>} />
        
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default Router;