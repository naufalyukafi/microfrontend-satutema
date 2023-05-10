import { Box, Center, Container, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Store from '../../../assets/images/store.png';
import Dolar from '../../../assets/images/dolar.png';
import Pengguna from '../../../assets/images/pengguna.png';

const MainWebsiteChooser = () => {
  return (
    <Box p={10} minH={250} backgroundImage="./images/bgconcrete.png">
      <Container maxW="container.lg">
        <Heading textAlign="center" mt={20} fontWeight={500}>
          Kenapa Menggunakan SatuTema?
        </Heading>
        <Flex mt={30} justify="space-between">
          <Box textAlign="center">
            <Center>
              <img src={Store} alt="store" width={200} />
            </Center>
            <Text mt="5" textAlign="center">
              Buat Website Digital Anda dengan Mudah
            </Text>
          </Box>
          <Box textAlign="center">
            <Center>
              <img src={Dolar} alt="dolar" width={200} />
            </Center>
            <Text mt="5" textAlign="center">
              Buat Website Mulai dari Rp. 0
            </Text>
          </Box>
          <Box textAlign="center">
            <Center>
              <img
                src={Pengguna}
                alt="store"
                style={{ objectFit: 'cover' }}
                width={200}
              />
            </Center>
            <Text mt="5" textAlign="center">
              Untuk Semua Pengguna dan Desain Terbaru
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default MainWebsiteChooser;
