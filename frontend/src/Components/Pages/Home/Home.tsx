import { Text, Box, Container, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import "./Home.css";

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

function Home(): JSX.Element {

  const animation = `${animationKeyframes} 4s ease-in-out infinite`;


   
    return (
        <div className="Home">
          <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize='6xl' fontWeight='extrabold'>
            --Vacation-App--<br />
            Name: Vladimir Berdibekov<br />
            Id: 311937239<br />
            Course: Full Stack Web class84<br />
            admin 654321
            user 1234
          </Text>
          <Container h="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box
        as={motion.div}
        animation={animation}
        // not work: transition={{ ... }}
        padding="2"
        // @ts-ignore - "Does not exist" Type Error against Motion
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        width="12"
        height="12"
        display="flex"
      />
    </Container>
        </div>
    );
}

export default Home;
