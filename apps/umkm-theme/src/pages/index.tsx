import React from 'react';
import Website from './website';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Website />} />
        <Route path="/:id" element={<Website />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
