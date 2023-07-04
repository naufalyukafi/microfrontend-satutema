import {
  Box,
  Button,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { mutate } from 'swr';
import useRemoteWebsiteByParam from '../../hooks/remote/useRemoteWebsiteByParam';
import { FeatureFormValues } from '../../ts/schema/featureSchema';
import { FeatureFormSchema } from '../../utils/schema/featureSchema';
import { HOST } from '../../utils/Host';
import { useParams } from 'react-router-dom';

const FeatureComponent = () => {
  const toast = useToast();
  const { id } = useParams();
  const { data } = useRemoteWebsiteByParam();
  const [image, setImage] = useState<string | Blob>();
  const [fileImg, setFileImg] = useState('');

  const parseObj = data && JSON.parse(data?.content as string);

  const { register, handleSubmit, control, setValue } =
    useForm<FeatureFormValues>({
      resolver: yupResolver(FeatureFormSchema),
    });
  const { errors } = useFormState({ control });

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(undefined);
    }
  };

  const onSubmit: SubmitHandler<FeatureFormValues> = (values) => {
    setLoading(true);
    const obj = {
      ...parseObj,
      feature: {
        title: values.title,
        description: values.description,
      },
    };
    const formData = new FormData();
    if (image) {
      formData.append('file', image);
      formData.append('content', JSON.stringify(obj));
    }

    axios
      .put(`${HOST as string}/admin/website/feature/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('xtoken') as string}`,
        },
      })
      .then((data) => {
        setLoading(false);
        if (data && data.data.status) {
          mutate(`/admin/website/${id}`);
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

  useEffect(() => {
    if (data) {
      setValue('title', parseObj?.feature?.title);
      setValue('description', parseObj?.feature?.description);
      setFileImg(parseObj?.feature?.imageFeature);
    }
  }, [data]);
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
          Fitur
        </Heading>
        <VStack align="stretch" mb={5}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Judul</FormLabel>
            <Input type="text" variant="outline" {...register('title')} />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack align="stretch" mb={5}>
          <FormControl isInvalid={!!errors.description}>
            <FormLabel>Deskripsi</FormLabel>
            <Input type="text" variant="outline" {...register('description')} />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack align="stretch" mb={5}>
          <FormControl>
            <FormLabel>Gambar</FormLabel>
            <Input
              data-testid="file-input"
              onChange={handleImageChange}
              type="file"
              pt={1}
              variant="outline"
            />
            {fileImg?.length > 0 && (
              <Box my={5}>
                <img src={fileImg} alt={parseObj?.feature?.title} />
              </Box>
            )}
          </FormControl>
        </VStack>

        <VStack align="stretch">
          <Button
            isLoading={loading}
            onClick={handleSubmit(onSubmit)}
            colorScheme="blue"
          >
            Simpan
          </Button>
        </VStack>
      </Container>
    </VStack>
  );
};

export default FeatureComponent;
