import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Icon,
  Stack,
  Divider,
  Checkbox,
} from '@chakra-ui/react';
import { MdFavorite, MdCheckCircle, MdPlayCircle } from 'react-icons/md';

export default function EnhancedPolicyCard({ policy }) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={5}
      shadow="sm"
      width="100%"
      mb={4}
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          {policy.name || 'Super Star'}
        </Text>
        <Badge colorScheme="purple" borderRadius="full" px={2}>
          New Launch
        </Badge>
      </Flex>
      <Text fontSize="sm" color="gray.600" mt={2}>
        {policy.description ||
          'A fully loaded plan with one-time unlimited claim, unlimited bonus, lock the age till 50, and other exciting features.'}
      </Text>

      <Stack spacing={2} mt={4}>
        {policy.features?.map((feature, index) => (
          <Flex key={index} align="center">
            <Icon as={MdCheckCircle} color="green.500" w={5} h={5} mr={2} />
            <Text fontSize="sm" color="gray.700">
              {feature}
            </Text>
          </Flex>
        ))}
      </Stack>

      <Divider my={4} />

      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" color="gray.500">
            Cover amount
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            ₹{policy.coverAmount || '10 Lakh'}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Cashless hospitals
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            {policy.cashlessHospitals || '480'}
          </Text>
        </Box>
        <Box>
          <Text fontSize="sm" color="gray.500">
            Premium
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="red.500">
            ₹{policy.premiumMonthly || '632'}/month
          </Text>
          <Text fontSize="sm" color="gray.500">
            ₹{policy.premiumAnnual || '7,584'} annually
          </Text>
        </Box>
      </Flex>

      <Divider my={4} />

      <Flex justify="space-between" align="center">
        <Flex>
          <Button
            size="sm"
            variant="link"
            colorScheme="blue"
            rightIcon={<Icon as={MdPlayCircle} />}
          >
            Watch plan video
          </Button>
          <Button size="sm" variant="link" colorScheme="blue" ml={4}>
            View all features
          </Button>
        </Flex>
        <Checkbox colorScheme="green">Add to compare</Checkbox>
      </Flex>
    </Box>
  );
}
