import {
    Box,
    Flex,
    Text,
    Stack,
    Badge,
    useColorModeValue,
    Icon,
  } from '@chakra-ui/react';
  import React, { useEffect, useState } from 'react';
  import { MdCancel, MdCheckCircle } from 'react-icons/md';
  import axios from 'axios';
  import { healthPolicies } from './data';
  import EnhancedPolicyCard from './PolicyCard';

  export default function PoliciesList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const cardBg = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
  
    // Fetch policies data from API
    useEffect(() => {
      const fetchPolicies = async () => {
        try {
          const response = await axios.get('/api/policies'); // Replace with your API endpoint
          const formattedData = response.data.map((policy) => ({
            policyNumber: policy.policyNumber,
            policyType: policy.policyType,
            coverageAmount: policy.coverageAmount,
            premiumAmount: policy.premiumAmount,
            startDate: policy.startDate,
            endDate: policy.endDate,
            status: policy.status,
            user: policy.user,
          }));
          if (!formattedData) {
            setData(healthPolicies);
          } else setData(formattedData);
        } catch (error) {
          console.error('Error fetching policies:', error);
        } finally {
          setData(healthPolicies); // Fallback to dummy data
          setLoading(false);
        }
      };
      fetchPolicies();
    }, []);
  
    if (loading) {
      return <Text>Loading policies...</Text>;
    }
  
    return (
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <Text fontSize="22px" fontWeight="700" mb="16px">
          Health Policies
        </Text>
        <Stack spacing={4}>
          {data.map((policy) => (
            // <Box
            //   key={policy.policyNumber}
            //   bg={cardBg}
            //   border="1px solid"
            //   borderColor={borderColor}
            //   borderRadius="md"
            //   p={5}
            //   shadow="md"
            // >
              <EnhancedPolicyCard policy={policy}/>
            // </Box>
          ))}
        </Stack>
      </Box>
    );
  }
  