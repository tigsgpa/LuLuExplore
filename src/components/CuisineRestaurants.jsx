import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CuisineRestaurants = () => {
  const { cuisineName } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.zoom = "90%"; // Set zoom level to 80%
    return () => {
      document.body.style.zoom = "100%"; // Reset on component unmount
    };
  }, []);

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/restaurants-by-tag`, {
          params: { tag: cuisineName },
        });

        const sortingOrders = {
          "Biriyani": ["HALAIS", "PARAGON", "DINDUGAL THALAPPAKATTI", "BARBEQUE NATION", "NORTH EXPRESS", "NAGAS"],
          // Add other cuisine sorting logic here
        };

        let fetchedRestaurants = response.data.data;

        if (sortingOrders[cuisineName]) {
          const order = sortingOrders[cuisineName].map((name) => name.trim().toLowerCase());
          fetchedRestaurants = fetchedRestaurants.sort((a, b) => {
            const indexA = order.indexOf(a.shop_name.trim().toLowerCase());
            const indexB = order.indexOf(b.shop_name.trim().toLowerCase());
            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
          });
        }

        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants.");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [cuisineName]);

  const rotatingLogoStyle = {
    width: '75px',
    height: '75px',
    animation: 'spin 2s linear infinite',
  };

  const loadingContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Full-page height for centering
    textAlign: 'center', // Ensure proper alignment
  };

  const keyframesSpin = `
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  if (loading)
    return (
      <div style={loadingContainerStyle}>
        <style>{keyframesSpin}</style>
        <img
          src="https://www.hyderabad.lulumall.in/wp-content/uploads/2023/07/unnamed-removebg-preview.png"
          alt="Loading..."
          style={rotatingLogoStyle}
        />
      </div>
    );

  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Restaurants offering {['Biryani', 'South Indian', 'North Indian'].includes(cuisineName) ? `${cuisineName} Cuisine` : cuisineName}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', padding: '10px' }}>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              onClick={() => handleRestaurantClick(restaurant._id)}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 4px 10px rgba(0.5, 0.5, 0.5, 0.5)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '20px',
                height: '200px',
              }}
            >
              <img
                src={restaurant.logo}
                alt={restaurant.shop_name}
                style={{
                  width: '120px',
                  height: '100px',
                  objectFit: 'contain',
                  marginBottom: '10px',
                }}
              />
              <h3 style={{ color: 'black', margin: '0', textAlign: 'center' }}>{restaurant.shop_name}</h3>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', fontSize: '1.2em', color: '#777' }}>
            No restaurants found for this cuisine.
          </div>
        )}
      </div>
    </div>
  );
};

export default CuisineRestaurants;
