import React from 'react';
import { Box, Text, Flex, Button, Divider } from '@chakra-ui/react';

const EmailDetails = ({ email, onMarkComplete, onEscalate }) => {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">{email.subject}</Text>
      <Text color="gray.500" mb="16px">{email.category}</Text>
      <Divider mb="16px" />
      
      <Text fontSize="lg" fontWeight="600">Details:</Text>
      <Text><strong>Policy Number:</strong> {email.policyNumber}</Text>
      <Text><strong>Claim ID:</strong> {email.claimId}</Text>
      <Text><strong>Description:</strong> {email.description}</Text>
      <Text><strong>Timestamp:</strong> {new Date(email.timestamp).toLocaleString()}</Text>

      <Flex mt="20px" justifyContent="space-between">
        <Button onClick={onMarkComplete} colorScheme="green">Mark as Complete</Button>
        <Button onClick={onEscalate} colorScheme="red">Escalate</Button>
      </Flex>
    </Box>
  );
};

export default EmailDetails;
