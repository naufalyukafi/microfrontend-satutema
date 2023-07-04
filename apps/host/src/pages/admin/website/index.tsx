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
} from '@chakra-ui/react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardTableWebsite from 'apps/host/src/components/dashboard/DashboardTableWebsite';
import useRemoteWebsiteAdmin from 'apps/host/src/hooks/remote/useRemoteWebsiteAdmin';

const Website = () => {
  const { data: dataWebsite } = useRemoteWebsiteAdmin();

  return (
    <DashboardLayout sidebarFor="admin">
      <VStack align="stretch" py="6" px="10" spacing="6">
        <Text fontSize="24" fontWeight="semibold">
          Website
        </Text>
        <Divider />
        <Box overflow="auto">
          <Table variant="striped">
            <Thead>
              <Tr fontSize="lg">
                <Th>Email</Th>
                <Th>Nama Website</Th>
                <Th>Slug</Th>
                <Th textAlign="center">Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataWebsite &&
                dataWebsite.map((el, index) => (
                  <DashboardTableWebsite
                    index={index}
                    dataWebsite={el}
                    key={el.id}
                  />
                ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </DashboardLayout>
  );
};

export default Website;
