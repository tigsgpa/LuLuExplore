import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Import Google Fonts in your index.html or dynamically in React
// Add this line in your main HTML file's <head> section or in an external CSS file:
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500&display=swap" rel="stylesheet">

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
    document.body.style.zoom = "90%"; // Set zoom level to 80%
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
  };

  const keyframesStyle = `
    @keyframes rotate-neon {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes slide-fade-in {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
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
        fontFamily: "'Playfair Display', serif"  // Use Playfair Display for restaurant name
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
          fontFamily: "'Playfair Display', serif",  // Use Playfair Display for Menu title
          textAlign: 'center',
          fontSize: '2.2em',
          marginBottom: '40px',
        }}
      >
        ⊶ Menu ⊷
      </h2>

      <div
        style={{
          display: 'grid',
          gap: '30px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
              backgroundColor: 'rgba(255, 255, 255, 0.9)'/*,
              backgroundImage: `url('https://t4.ftcdn.net/jpg/09/04/22/07/360_F_904220768_YMOrqcloOg3S9Rr0S13Hf1A67HgVyzlc.jpg')`*/,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              overflow: 'hidden',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'transform 0.5s ease, opacity 0.5s ease',
            }}
          >
            <style>{`
              .neon-card::before {
                content: "";
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: linear-gradient(
                  120deg,
                  #ff00aa,
                  #00FFF1,
                  #ff00aa
                );
                border-radius: inherit;
                filter: blur(20px);
                z-index: 0;
                animation: rotate-neon 4s linear infinite;
              }
              .neon-card::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: inherit;
                border-radius: inherit;
                padding: 2px;
                background-clip: content-box;
                z-index: 1;
              }
            `}</style>
            <div className="neon-card-content" style={{
              position: 'relative',
              zIndex: 2,
              borderRadius: '50px',
              padding: '20px',
              height: 'auto',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',  // Center the content
            }}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
