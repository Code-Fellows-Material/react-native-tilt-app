import React from "react";
import { HStack, IconButton, Icon, Text, Box, StatusBar, useColorMode, useColorModeValue } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';


export default function AppBar() {

  const {
    toggleColorMode
  } = useColorMode();
  
  return <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="#6200ee" />
      <HStack bg={useColorModeValue("#6200ee", "#50BFC3")} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
        <HStack alignItems="center">
          <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
          <Text color="white" fontSize="20" fontWeight="bold">
            What The App?!
          </Text>
        </HStack>
        <HStack>
          <IconButton icon={<Ionicons name="moon-outline" size={40} color="white" onPress={toggleColorMode}/>} />
        </HStack>
      </HStack>
    </>;
}