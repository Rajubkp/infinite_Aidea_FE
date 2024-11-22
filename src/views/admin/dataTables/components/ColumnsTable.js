import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Flex,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  Tooltip,
  useColorModeValue,
  Input,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import Card from 'components/card/Card';

const columnHelper = createColumnHelper();

export default function EnhancedTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  // Define table columns
  const columns = [
    columnHelper.accessor('name', {
      id: 'avatar',
      header: 'AVATAR',
      cell: (info) => (
        <Avatar
          _hover={{ cursor: 'pointer' }}
          color="white"
          name={info.getValue()}
          bg="#11047A"
          size="sm"
          w="40px"
          h="40px"
        />
      ),
    }),
    columnHelper.accessor('name', {
      id: 'name',
      header: 'NAME',
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: 'EMAIL',
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('role', {
      id: 'role',
      header: 'ROLE',
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('isEmailVerified', {
      id: 'isEmailVerified',
      header: 'VERIFIED',
      cell: (info) => (
        <Text
          color={info.getValue() ? 'green.500' : 'red.500'}
          fontWeight="700"
        >
          {info.getValue() ? 'Yes' : 'No'}
        </Text>
      ),
    }),
    columnHelper.accessor('lastLogin', {
      id: 'lastLogin',
      header: 'LAST LOGIN',
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue() || 'N/A'}
        </Text>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'ACTIONS',
      cell: (info) => (
        <Flex>
          <Tooltip label="View Profile" fontSize="sm">
            <Button size="sm" colorScheme="blue" mr={2}>
              View
            </Button>
          </Tooltip>
          <Tooltip label="Edit User" fontSize="sm">
            <Button size="sm" colorScheme="yellow" mr={2}>
              Edit
            </Button>
          </Tooltip>
          <Tooltip label="Delete User" fontSize="sm">
            <Button size="sm" colorScheme="red">
              Delete
            </Button>
          </Tooltip>
        </Flex>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users?limit=100&page=1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Add mock last login data for demonstration
        const resultsWithLogin = response.data.results.map((user, index) => ({
          ...user,
          lastLogin: index % 2 === 0 ? '2024-11-15 14:35' : '2024-11-14 18:45',
        }));

        // Set table data
        setData(resultsWithLogin);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter data by search
  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="16px" justify="space-between" align="center">
        <Text fontSize="22px" fontWeight="bold" color={textColor}>
          Users Table
        </Text>
        <Input
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          w="300px"
        />
      </Flex>
      {loading ? (
        <Text color={textColor} textAlign="center">
          Loading...
        </Text>
      ) : (
        <Table variant="simple" color="gray.500" mb="24px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    borderColor={borderColor}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {filteredData.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {table.getRowModel().rows[rowIndex]?.getVisibleCells().map(
                  (cell) => (
                    <Td
                      key={cell.id}
                      fontSize="sm"
                      borderColor="transparent"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  )
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Card>
  );
}
