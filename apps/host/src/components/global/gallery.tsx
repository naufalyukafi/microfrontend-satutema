import {
  Box,
  Container,
  VStack,
  Heading,
  useColorModeValue,
  Image,
  useDisclosure,
  useToast,
  Button,
  Input,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';
import useRemoteWebsiteByParam from '../../hooks/remote/useRemoteWebsiteByParam';
import DashboardCreateNewGallery from '../dashboard/DashboardCreateNewGallery';
import { useState } from 'react';
import axios from 'axios';
import { HOST } from '../../utils/Host';
import { mutate } from 'swr';
import { useParams } from 'react-router-dom';

const GalleryComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const { data } = useRemoteWebsiteByParam();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | Blob>();

  const toast = useToast();

  const parseObj = data && JSON.parse(data?.content as string);
  console.log(parseObj?.gallery);

  const onModalClose = () => {
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(undefined);
    }
  };

  const onSubmit = () => {
    setLoading(true);

    const formData = new FormData();
    if (image) {
      formData.append('file', image);
      formData.append('content', JSON.stringify(parseObj));
    }

    axios
      .put(`${HOST as string}/admin/website/gallery/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('xtoken') as string}`,
        },
      })
      .then((data) => {
        setLoading(false);
        if (data && data.data.status) {
          mutate(`/admin/website/${id}`);
          onModalClose();
        } else {
          toast({
            title: 'Terjadi Kesalahan',
            description: data.data.message,
            status: 'error',
            isClosable: true,
            position: 'top-right',
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err === 'ECONNABORTED') {
          toast({
            title: 'Terjadi Kesalahan',
            description:
              ' Tidak dapat menjangkau Server, Periksa koneksi anda dan ulangi beberapa saat lagi.',
            status: 'error',
            isClosable: true,
            position: 'top-right',
          });
        } else {
          toast({
            title: 'Terjadi Kesalahan',
            description: err.response.data.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'bottom',
          });
        }
      });
  };

  return (
    <VStack align="stretch" py="4">
      <Container
        maxW="container.lg"
        border="1px solid rgba(18, 18, 18, 0.13)"
        borderRadius={10}
        p={10}
      >
        <Heading
          fontFamily={'Work Sans'}
          fontWeight={'bold'}
          color={useColorModeValue('gray.700', 'gray.50')}
          textAlign="center"
          my={6}
        >
          Galeri
        </Heading>

        <Box gap={5} display="flex" flexWrap="wrap">
          <VStack align="stretch" minWidth="60%">
            <FormControl isRequired>
              {/* <FormLabel>Gambar</FormLabel> */}
              <Input
                onChange={handleImageChange}
                type="file"
                pt={1}
                variant="outline"
                data-testid="file-input"
              />
              <FormHelperText>
                klik chose file untuk memilih gambar gallery
              </FormHelperText>
              {/* <FormErrorMessage> */}
              {/* {errors.title && errors.title.message} */}
              {/* </FormErrorMessage> */}
            </FormControl>
          </VStack>
          <Button
            onClick={onSubmit}
            colorScheme="blue"
            width={200}
            type="submit"
            rounded="md"
            isLoading={loading}
            data-testid="add-gallery-button"
          >
            Tambah
          </Button>
          {parseObj?.gallery?.map((el: string, index: number) => (
            <Box
              data-testid="gallery"
              key={index}
              w="50%"
              p={{ base: 1, md: 2 }}
              cursor="pointer"
            >
              <Image
                // pb={{ base: '5.5vw', ts: '4.5vw', sm: '2vw' }}
                w="100%"
                // minW={150}
                // maxW={150}
                src={el}
                alt="sdfsdf"
              />
            </Box>
          ))}
        </Box>
      </Container>
    </VStack>
  );
};

export default GalleryComponent;
