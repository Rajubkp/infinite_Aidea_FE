import React from 'react';

// Chakra imports
import { Flex } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';
import Logo from 'assets/img/main-logo.png';
export function SidebarBrand() {
  return (
    <Flex align="center" direction="column">
      <img src={Logo} alt="logo" />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
