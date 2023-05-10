import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import MenuCard from '../../components/theme/MenuCard';
import Food from './foodplaceholder.jpg';

const Data = {
  main: [
    {
      title: 'Mini Zupa Soup',
      description: 'Berisi 4 mini zupa soup smokebeef',
      image: Food,
    },
    {
      title: 'Mini Lasagna',
      description: 'Berisi 4 mini beef lasagna',
      image: Food,
    },
    {
      title: 'Mini Mix',
      description: '1 Box berisi 2 mini zupa dan 2 mini lasagna',
      image: Food,
    },
    {
      title: 'Mini Mix',
      description: '1 Box berisi 2 mini zupa dan 2 mini lasagna',
      image: Food,
    },
  ],
};

interface IDetailMenu {
  title: string;
  description: string;
  imageProduct: string;
}

interface IMenu {
  data?: IDetailMenu[];
}

const Menu1 = ({ data }: IMenu) => {
  return (
    <>
      <Heading
        fontFamily={'Work Sans'}
        fontWeight={'bold'}
        color={useColorModeValue('gray.700', 'gray.50')}
        // fontSize={26}
        textAlign="center"
        my={6}
      >
        Menu Kami
      </Heading>
      {/* <Box
            width={{ base: 'full', sm: 'lg', lg: 'xl' }}
            margin={'auto'}
            textAlign="center"
            mb={5}
            maxW="100%"
         >
            <chakra.h2
               margin={'auto'}
               width={{ base: '100%', md: '70%' }}
               fontFamily={'Inter'}
               fontWeight={'medium'}
               color={useColorModeValue('gray.500', 'gray.400')}
            >
               See our menu influencers use EEZY to manage their social media content!
            </chakra.h2>
         </Box> */}
      <Flex
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
        justifyContent="center"
        gap={5}
        flex={1}
        mb={10}
      >
        <Box
          flex={1}
          // bg="#F2EFEF"
          minH="fit-content"
          minW="80%"
          textAlign="center"
          rounded="md"
          pt={5}
        >
          <Flex
            flexWrap="wrap"
            justifyContent="center"
            justify={{ base: 'auto', md: 'start' }}
            ml={5}
            gap={2}
            mr={5}
          >
            {data && data.length > 1
              ? data.map((el, i) => (
                  <MenuCard
                    key={i}
                    title={el.title}
                    description={el.description}
                    image={el.imageProduct}
                  />
                ))
              : Data.main.map((el, i) => (
                  <MenuCard
                    key={el.title}
                    title={el.title}
                    description={el.description}
                    image={el.image}
                  />
                ))}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Menu1;
