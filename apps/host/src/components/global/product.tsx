import {
  Box,
  Container,
  VStack,
  Heading,
  useColorModeValue,
  Image,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  HStack,
  Button,
  Spacer,
  Icon,
  TableContainer,
  Td,
  Avatar,
  ModalFooter,
  Modal,
  ModalContent,
  useDisclosure,
  useToast,
  Divider,
  ModalOverlay,
  ModalHeader,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm, useFormState, useWatch } from 'react-hook-form';
import { IoAdd, IoClose } from 'react-icons/io5';
import axios from 'axios';
import { mutate } from 'swr';
import useRemoteWebsiteByParam from '../../hooks/remote/useRemoteWebsiteByParam';
import { ProductFormValues } from '../../ts/schema/productSchema';
import { HOST } from '../../utils/Host';
import { ProductFormSchema } from '../../utils/schema/productSchema';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | Blob>();
  const toast = useToast();
  const { register, handleSubmit, reset, control } = useForm<ProductFormValues>(
    {
      resolver: yupResolver(ProductFormSchema),
    }
  );
  const { errors } = useFormState({ control });
  const { data } = useRemoteWebsiteByParam();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(undefined);
    }
  };

  const parseObj = data && JSON.parse(data.content as string);
  const onModalClose = () => {
    onClose();
    reset();
  };

  const onSubmit: SubmitHandler<ProductFormValues> = (values) => {
    setLoading(true);
    let obj = {};
    if (parseObj?.product) {
      obj = {
        ...parseObj,
        product: [
          ...parseObj?.product,
          {
            title: values.title,
            description: values.description,
            imageProduct: '',
          },
        ],
      };
    } else {
      obj = {
        ...parseObj,
        product: [
          {
            title: values.title,
            description: values.description,
            imageProduct: '',
          },
        ],
      };
    }

    const formData = new FormData();
    if (image) {
      formData.append('file', image);
      formData.append('content', JSON.stringify(obj));
    }

    axios
      .put(`${HOST as string}/admin/website/product/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('xtoken') as string}`,
        },
      })
      .then((data) => {
        setLoading(false);
        reset({
          title: '',
          description: '',
        });
        if (data && data.data.status) {
          mutate(`/admin/website/${id}`);
          onClose();
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
            position: 'top-right',
          });
        }
      });
  };

  return (
    <>
      <Heading
        fontFamily={'Work Sans'}
        fontWeight={'bold'}
        color={useColorModeValue('gray.700', 'gray.50')}
        //   textAlign="center"
        my={6}
      >
        Produk
      </Heading>
      <VStack align="stretch" mb={10}>
        <FormControl>
          <FormLabel>Foto Produk</FormLabel>
          <Input
            // pb={2}
            type="file"
            accept="image/*"
            variant="outline"
            onChange={handleImageChange}
            data-testid="file-input"
          />
        </FormControl>
      </VStack>
      <VStack align="stretch" mb={10}>
        <FormControl isRequired isInvalid={!!errors.title}>
          <FormLabel>Nama Produk</FormLabel>
          <Input type="text" variant="outline" {...register('title')} />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <VStack align="stretch" mb={10}>
        <FormControl isRequired isInvalid={!!errors.title}>
          <FormLabel>Deskripsi</FormLabel>
          <Input type="text" variant="outline" {...register('description')} />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <Button
        onClick={handleSubmit(onSubmit)}
        colorScheme="blue"
        width="100%"
        type="submit"
        rounded="md"
        isLoading={loading}
        data-testid="add-product-button"
      >
        Tambah
      </Button>

      <VStack align="stretch" py="4">
        <Container
          maxW="container.lg"
          border="1px solid rgba(18, 18, 18, 0.13)"
          borderRadius={10}
          p={10}
        >
          <TableContainer>
            <Table variant="striped" mt={5}>
              <Thead>
                <Tr fontSize="lg">
                  <Th>Nama Produk</Th>
                  <Th>Deskripsi</Th>
                  <Th>Gambar</Th>
                  <Th textAlign="center">Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {parseObj?.product?.map((el: any, index: number) => (
                  <Tr key={index}>
                    <Td>{el.title}</Td>
                    <Td>{el.description}</Td>
                    <Td>
                      <Avatar name={el.tile} src={el.imageProduct} />
                    </Td>
                    <Td>
                      <Button colorScheme="red">Hapus</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </VStack>
    </>
  );
};

export default ProductComponent;
