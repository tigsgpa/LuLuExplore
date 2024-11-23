import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const menuRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.zoom = "90%"; // Set zoom level to 90%
    return () => {
      document.body.style.zoom = "100%"; // Reset on component unmount
    };
  }, []);

  useEffect(() => {
    const fetchRestaurant = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://backend-05of.onrender.com/restaurant/${id}`);
        const data = response.data.data;

        if (!data) {
          throw new Error('Restaurant not found');
        }

        setRestaurant(data);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        setError('Failed to fetch restaurant data.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (menuRefs.current) {
      menuRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      if (menuRefs.current) {
        menuRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, [restaurant]);

  if (loading) return <div style={{ color: 'black' }}>Loading...</div>;
  if (error) return <div style={{ color: 'black' }}>{error}</div>;
  if (!restaurant) return <div style={{ color: 'black' }}>Restaurant not found</div>;

  const backgroundStyle = {
    backgroundImage: `url('/path-to-your-image.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center-aligns content horizontally
  };

  const keyframesStyle = `
    @keyframes rotate-neon {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={backgroundStyle}>
      <style>{keyframesStyle}</style>
      <h1 style={{
        color: '#000',
        fontSize: '3em',
        textAlign: 'center',
        fontWeight: '700',
        fontFamily: "'Playfair Display', serif"
      }}>
        {restaurant.shop_name}
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img
          src={restaurant.logo}
          alt={restaurant.shop_name}
          style={{
            width: '200px',
            height: 'auto',
            borderRadius: '50%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>

      <h2
        style={{
          color: '#000',
          fontFamily: "'Playfair Display', serif",
          textAlign: 'center',
          fontSize: '2.2em',
          marginBottom: '40px',
        }}
      >
        ⊶ Menu ⊷
      </h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap', // Wrap items for responsiveness
          justifyContent: 'center', // Horizontally center items
          gap: '30px', // Add space between items
          width: '100%', // Ensure it spans the full width
          maxWidth: '1200px', // Optional: limit width for larger screens
        }}
      >
        {restaurant.menu.map((category, index) => (
          <div
            key={category.category}
            ref={(el) => (menuRefs.current[index] = el)}
            className="neon-card"
            style={{
              position: 'relative',
              width: '300px',
              padding: '25px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'transform 0.5s ease, opacity 0.5s ease',
              textAlign: 'center', // Center-aligns the content
            }}
          >
            <h3
              style={{
                fontSize: '1.8em',
                color: '#000',
                marginBottom: 'px',
                background: 'linear-gradient(to bottom right, #ff00aa, #00FFF1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
              }}
            >
              {category.category}
            </h3>

            <div style={{ paddingLeft: '10px' }}>
              <ol style={{
                listStyleType: 'none',
                paddingLeft: '0',
                margin: '0',
                textAlign: 'center',
              }}>
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    style={{
                      marginBottom: '12px',
                      padding: '10px 0',
                      fontWeight: 'bold',
                      fontSize: '1.1em',
                      color: '#495057',
                      borderBottom: '1px solid #ddd',
                      transition: 'background-color 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {item.name}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
