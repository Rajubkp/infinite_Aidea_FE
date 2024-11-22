import React, { useState } from 'react';
import { Box, Input, Table, Tbody, Td, Text, Th, Thead, Tr, Button, Flex } from '@chakra-ui/react';

const EmailList = ({ emails, onEmailSelect }) => {
  const [search, setSearch] = useState('');

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(search.toLowerCase()) ||
      email.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Input
        placeholder="Search emails"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb="16px"
      />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Subject</Th>
            <Th>Category</Th>
            <Th>Timestamp</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredEmails.map((email) => (
            <Tr key={email.id} onClick={() => onEmailSelect(email)} _hover={{ cursor: 'pointer', bg: 'gray.100' }}>
              <Td>{email.subject}</Td>
              <Td>{email.category}</Td>
              <Td>{new Date(email.timestamp).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EmailList;
