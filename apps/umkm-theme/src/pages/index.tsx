import React from 'react';
import Website from './website';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import { Navbar1, useRemoteDetailTheme } from '@satutema/umkm-theme-libs';

const HomePage = () => {
  const { data } = useRemoteDetailTheme();
  return (
    <>
      <Navbar1 />
      <Heading textAlign="center" mt="50vh">
        Anda Tidak Memiliki Tema
      </Heading>
    </>
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
