import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tr,
  Td,
  Text,
  useDisclosure,
  UnorderedList,
  ListItem,
  VStack,
  LinkBox,
  LinkOverlay,
  Link,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';
import { ThemeRemoteDataType } from '../../../ts/Theme';
import { HOST } from '../../../utils/Host';

import ModalWarning from '../DashboardModalWarning';
import { WebsiteRemoteDataType } from 'libs/umkm-theme-libs/src/ts/Website';

interface IDashboardTableWebsite {
  dataWebsite: WebsiteRemoteDataType;
  index: number;
}
const DashboardTableWebsite = ({
  dataWebsite,
  index,
}: IDashboardTableWebsite) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const onDelete = () => {
    setLoading(true);
    axios
      .delete(`${HOST as string}/admin/website/${dataWebsite.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('xtoken') as string}`,
        },
      })
      .then((data) => {
        setLoading(false);
        if (data && data.data.status) {
          mutate('/theme');
          onDeleteModalClose();
          toast({
            title: 'Sukses',
            description: data.data.message,
            status: 'success',
            isClosable: true,
            position: 'bottom',
          });
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
      <Tr fontSize="md" data-testid={`row-${index}`}>
        <Td>
          <Text>{dataWebsite?.email}</Text>
        </Td>
        <Td>
          <Text textTransform="capitalize">{dataWebsite?.website_name}</Text>
        </Td>
        <Td>
          <Link
            href={`https://theme-satutema.vercel.app/?website=${dataWebsite.slug}`}
            isExternal
          >
            {`https://theme-satutema.vercel.app/?website=${dataWebsite.slug}`}
          </Link>
        </Td>

        <Td textAlign="center">
          <Menu isLazy placement="left">
            <MenuButton
              as={IconButton}
              icon={<BsThreeDotsVertical />}
              variant="outline"
              w="14"
              colorScheme="blue"
              _hover={{
                backgroundColor: '#2A6B84',
                color: '#fff',
                outline: 'none',
              }}
              data-testid={`open-modal-${index}`}
            />
            <MenuList minW="36">
              <MenuItem
                data-testid={`button-edit-${index}`}
                onClick={() =>
                  navigate(`/admin/website-editor/${dataWebsite.id}`)
                }
              >
                Edit
              </MenuItem>
              <MenuItem
                data-testid={`button-delete-${index}`}
                onClick={onDeleteModalOpen}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>

      <ModalWarning
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        buttonText="Hapus Website"
        buttonOnClick={onDelete}
        isLoading={loading}
      >
        Kamu yakin ingin menghapus website {dataWebsite?.website_name} ?
      </ModalWarning>
    </>
  );
};

export default DashboardTableWebsite;
