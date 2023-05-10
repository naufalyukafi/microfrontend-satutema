import React from 'react';
import Website from './website';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Heading textAlign="center" mt="50vh">
      Anda Tidak Memiliki Tema
    </Heading>
  );
};
const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/website/:id" element={<Website />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
