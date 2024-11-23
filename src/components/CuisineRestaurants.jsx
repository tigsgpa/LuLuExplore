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
    navigate(`/restaurant/${restaurantId}/menu/${cuisineName}`);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/restaurants-by-tag`, {
          params: { tag: cuisineName },
        });
        setRestaurants(response.data.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants.");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [cuisineName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Restaurants offering {['Arabic', 'Italian', 'Mexican', 'Chinese', 'South Indian', 'North Indian'].includes(cuisineName) ? `${cuisineName} Cuisine` : cuisineName}
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
