import React, { useEffect } from 'react';
import { Box } from '@mui/material';



const ComingSoon = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
      useEffect(() => {
        document.body.style.zoom = "90%"; // Set zoom level to 80%
        return () => {
          document.body.style.zoom = "100%"; // Reset on component unmount
        };
      }, []);
  return (
    <Box
      sx={{
        
        alignItems: 'center',
        
        marginTop: '-300px', // Adjust this value to match your navbar height
      }}
    >
      <img
        src="https://i.ibb.co/7bV7rKH/comsoon.png"
        alt="Coming Soon"
        style={{
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};

export default ComingSoon;

