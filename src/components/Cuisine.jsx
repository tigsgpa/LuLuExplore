/*
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cuisine = () => {
  const cuisines = [
    { name: 'Kerala Special', image: 'https://clubmahindra.gumlet.io/blog/images/Sadya-resized.jpg?w=376&dpr=2.6' },
    { name: 'Arabic ', image: 'https://i.pinimg.com/736x/2d/5b/59/2d5b5902cc9bec12c2a626204e3faf58.jpg' },
    { name: 'North Indian', image: 'https://t4.ftcdn.net/jpg/06/01/16/63/360_F_601166394_1W98QexrsbQINOfjT6QVdFKF0e3TxzVk.jpg' },
    { name: 'South Indian ', image: 'https://png.pngtree.com/thumb_back/fw800/background/20240619/pngtree-south-indian-thali-meal-with-dosa-idli-sambar-image_15877856.jpg' },
    { name: 'Mexican ', image: 'https://i.pinimg.com/736x/83/33/8c/83338cdf1d69831d67aa932d1cdd8add.jpg' },
    { name: 'Chinese ', image: 'https://i.pinimg.com/736x/60/e0/2b/60e02bb4ae76df54f3e9e0212689af07.jpg' },
    { name: 'Italian ', image: 'https://cdn.vox-cdn.com/thumbor/v4dy34rtSOWP6RwRMMIiU_jzKL4=/0x0:1440x960/1200x900/filters:focal(605x365:835x595)/cdn.vox-cdn.com/uploads/chorus_image/image/62299511/135473457_2136745033136876_4481108825547293031_o.6.jpg' },
    { name: 'Salads', image: 'https://justanotherfoodiegram.com/wp-content/uploads/2020/10/IMG_1456-1024x682.jpg' },
    { name: 'Starters', image: 'https://t4.ftcdn.net/jpg/06/59/75/47/360_F_659754773_aUJ0NHTs7lRxBOF6CvbwzV0WbihC5bGS.jpg' },
    { name: 'Snacks', image: 'https://c1.wallpaperflare.com/preview/155/264/1006/food-dining-snack-dessert-bread-breakfast.jpg' },
    { name: 'Beverages', image: 'https://in.thebar.com/_next/image?url=https%3A%2F%2Fcms.in.thebar.com%2FPR1670%2Fpublic%2F2023-12%2Fkobby-mendez-xBFTjrMIC0c-unsplash_0.webp%3FVersionId%3D34JtG9bxDbXVdGTQvP6jNerC15y58CMg&w=3840&q=75' },
    { name: 'Dessert', image: 'https://as1.ftcdn.net/v2/jpg/02/52/45/06/1000_F_252450661_NFpyPo3BmPDXjmGjQjJpsF7bGCktORab.jpg' }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  const handleInputChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/restaurants/${searchQuery}`);
    }
  };

  const handleCardClick = (cuisineName) => {
    navigate(`/restaurants/${cuisineName}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          } else {
            entry.target.style.opacity = 0;
            entry.target.style.transform = 'translateY(100px)';
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", maxWidth: '1200px', margin: '0 auto', padding: '20px', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '20px',
        marginBottom: '50px',
        position: 'sticky',
        top: '10%',
        zIndex: 100,
        backgroundColor: 'transparent',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      }}>
        <FaSearch style={{ fontSize: '20px', marginRight: '10px', color: '#6c757d' }} />
        <input
          type="text"
          placeholder="Search by Cuisine..."
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            flex: 1,
          }}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {cuisines.map((cuisine, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(cuisine.name)}
            ref={(el) => (cardRefs.current[index] = el)}
            style={{
              cursor: 'pointer',
              backgroundColor: '#fff',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              opacity: 0,
              transform: 'translateY(100px)',
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            }}
          >
            <img src={cuisine.image} alt={cuisine.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '10px' }}>{cuisine.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cuisine;
*/

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
        src="/src/assets/comsoon.png"
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

