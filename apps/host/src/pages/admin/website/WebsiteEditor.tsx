import {
  Box,
  VStack,
  Table,
  Tbody,
  Text,
  Thead,
  Tr,
  Th,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Flex,
  Spacer,
  useMediaQuery,
  Heading,
  useColorModeValue,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  TableContainer,
  Td,
  Avatar,
  Image,
  FormHelperText,
  Textarea,
  ButtonGroup,
  CardFooter,
  Badge,
  useDisclosure,
  useToast,
  CardHeader,
  SimpleGrid,
  Card,
} from '@chakra-ui/react';
import { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThemeRemoteDataType } from 'apps/host/src/ts/Theme';
import { HOST } from 'apps/host/src/utils/Host';
import { mutate } from 'swr';
import axios from 'axios';
import ModalWarning from 'apps/host/src/components/dashboard/DashboardModalWarning';
import useRemoteTheme from 'apps/host/src/hooks/remote/useRemoteTheme';
import useRemoteWebsiteByParam from 'apps/host/src/hooks/remote/useRemoteWebsiteByParam';
import { useNavigate, useParams } from 'react-router-dom';
import SettingComponent from 'apps/host/src/components/global/setting';
import FeatureComponent from 'apps/host/src/components/global/feature';
import ProductComponent from 'apps/host/src/components/global/product';
import GalleryComponent from 'apps/host/src/components/global/gallery';
import TestimonyComponent from 'apps/host/src/components/global/testimoni';
import { BiArrowBack } from 'react-icons/bi';

const WebsiteEditor = () => {
  const tabNames = [
    'Pengaturan Website',
    'Fitur',
    'Produk',
    'Galeri',
    'Testimoni',
    'Tema',
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [isSmallerThanMd] = useMediaQuery('(max-width: 768px)');
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: themes } = useRemoteTheme();
  const { data: website } = useRemoteWebsiteByParam();
  const [editTheme, setEditTheme] = useState<ThemeRemoteDataType>();
  const [loading, setLoading] = useState(false);

  const {
    isOpen: isOpenEditTheme,
    onOpen: onOpeneditTheme,
    onClose: onCloseEditTheme,
  } = useDisclosure();

  const onHandleOpenEdit = (data: ThemeRemoteDataType) => {
    onOpeneditTheme();
    setEditTheme(data);
  };

  const onEditTheme = () => {
    setLoading(true);
    axios
      .put(
        `${HOST as string}/admin/website/theme/${id}`,
        {
          theme_id: editTheme?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('xtoken') as string}`,
          },
        }
      )
      .then((data) => {
        setLoading(false);
        if (data && data.data.status) {
          mutate('/theme');
          mutate(`/admin/website/${id}`);
          onCloseEditTheme();
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
    <DashboardLayout sidebarFor="admin">
      <Box p={4}>
        <Button
          leftIcon={<BiArrowBack />}
          colorScheme="blue"
          onClick={() => navigate('/admin/website')}
          mb={5}
        >
          Kembali
        </Button>
        <Tabs index={activeTab} onChange={(index) => setActiveTab(index)}>
          <TabList
            flexDirection={isSmallerThanMd ? 'column' : 'row'}
            alignItems={isSmallerThanMd ? 'flex-start' : 'center'}
          >
            {tabNames.map((tabName, index) => (
              <Tab key={index}>{tabName}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabNames.map((_, index) => (
              <TabPanel key={index}>
                <VStack spacing={4} align="stretch">
                  <Box minHeight="65vh">
                    {activeTab === 0 ? (
                      <SettingComponent />
                    ) : activeTab === 1 ? (
                      <FeatureComponent />
                    ) : activeTab === 2 ? (
                      <ProductComponent />
                    ) : activeTab === 3 ? (
                      <GalleryComponent />
                    ) : activeTab === 4 ? (
                      <TestimonyComponent />
                    ) : (
                      activeTab === 5 && (
                        <>
                          <VStack align="stretch" py="4">
                            <SimpleGrid
                              spacing={4}
                              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                            >
                              {themes &&
                                themes.map((el) => (
                                  <Card key={el.id}>
                                    <CardHeader>
                                      <VStack>
                                        <Heading size="md">
                                          {el.theme_name}
                                        </Heading>
                                        <Badge>{el.category}</Badge>
                                      </VStack>
                                      {/* <Button>Pilih Tema</Button> */}
                                    </CardHeader>
                                    <CardFooter
                                      alignItems="center"
                                      justifyContent="center"
                                      textAlign="center"
                                    >
                                      {website?.theme_id === el.id ? (
                                        <Button
                                          disabled={true}
                                          width="100%"
                                          colorScheme="blue"
                                          variant="outline"
                                          data-testid="chosed-button"
                                        >
                                          Digunakan
                                        </Button>
                                      ) : (
                                        <ButtonGroup>
                                          <Button
                                            data-testid="chose-theme-button"
                                            onClick={() => onHandleOpenEdit(el)}
                                            colorScheme="blue"
                                          >
                                            Pilih Tema
                                          </Button>
                                          <Button
                                            colorScheme="blue"
                                            onClick={() =>
                                              window.open(
                                                `/preview/${el.id}`,
                                                '_blank'
                                              )
                                            }
                                          >
                                            Lihat
                                          </Button>
                                        </ButtonGroup>
                                      )}
                                    </CardFooter>
                                  </Card>
                                ))}
                            </SimpleGrid>
                          </VStack>
                        </>
                      )
                    )}
                  </Box>
                  {/* Konten Tab */}
                </VStack>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
      <ModalWarning
        buttonText="Rubah Tema"
        isOpen={isOpenEditTheme}
        onClose={onCloseEditTheme}
        buttonOnClick={onEditTheme}
        isLoading={loading}
      >
        Apakah Anda yakin ingin merubah tema &quot;
        {editTheme?.theme_name}
        &quot;?
      </ModalWarning>
    </DashboardLayout>
  );
};

export default WebsiteEditor;
