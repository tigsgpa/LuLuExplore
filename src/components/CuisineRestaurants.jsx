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
    document.body.style.zoom = "80%"; // Set zoom level to 80%
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
        const response = await axios.get(`https://backend-05of.onrender.com/api/restaurants-by-tag`, {
          params: { tag: cuisineName },
        });

        const sortingOrders = {
          "Biryani": ["HALAIS", "PARAGON", "DINDUGAL THALAPPAKATTI", "BARBEQUE NATION",  "NORTH EXPRESS", "NAGAS"],
          "Fried Rice" : ["RICE AND NOODLES", "WOW CHINA" , "FLAME N GO", "PARAGON", "HOTTEY SMOKEY"],
          "Shawarma / Rolls and Wraps" : ["KLUB HOUSE", "SUBWAY", "WRAP VIBES", "CHICKING", "BURGER KING", "TACO BELL"],
          "Burger" : ["BURGER KING", "Mc' DONALD", "CHICKING", "KFC"],
          "Bread" : ["VASANTA BHAVAN", "NORTH EXPRESS", "PARAGON", "NAGAS","VAIGA'S OOTUPURA"],
          "Pure Veg" : ["VASANTA BHAVAN", "VAIGA'S OOTUPURA"],
          "Noodles" : ["RICE AND NOODLES", "FLAME N GO", "WOW CHINA", "PARAGON", "HOTTEY SMOKEY"],
          "Momos" : ["WOW MOMO", "RICE AND NOODLES"],
          "Ice Cream / Desserts" : ["AMUL ICE CREAMS", "ICE CREAM CHEF", "BASKIN ROBBINS", "COLD STONE CREAMERY", "MY FRYOLAND", "THE MUFFIN HOUSE", "Mc' DONALD", "BURGER KING"],
          "Pizza" : [ "PIZZA HUT","DOMINOS","PIZZA RICOTTA"],
          "Pulao" : ["VASANTA BHAVAN", "NORTH EXPRESS", "PARAGON"],   
          "Soup" : ["RICE AND NOODLES", "BARBEQUE NATION", "WOW CHINA", "HALAIS",  "NORTH EXPRESS", "PARAGON", "HOTTEY SMOKEY", "FLAME N & GO", "VASANTA BHAVAN"],
          "Kothu Paratta" : ["DINDUGAL THALAPPAKATTI", "HALAIS"] ,
          "Sandwich" : ["SUBWAY", "STARBUCKS","COSTA COFFEE","THE MUFFIN HOUSE","CHAI-CHAI", "KLUB HOUSE", "COFFEE CUP", "SELFIE TEA","OVENLY"],
          "Seafood" : [ "PARAGON","HALAIS"," DINDUGAL THALAPPAKATTI", "BARBEQUE NATION", "NORTH EXPRESS"],
          "Tacos" : ["TACO BELL","CHICKING", "BURGER KING"],
          "Meals" : ["PARAGON", "VASNATHABHAVAN", "VAIGA'S OOTUPURA"],
          "Snacks" : ["SELFIE TEA", "CHAI- CHAI", "OVENLY", "VAIGAS OOTUPURA", "THE MUFFIN HOUSE"],
          "Sizzler" : ["HOTTEY SMOKEY" ,"WOW CHINA","WOW MOMO","VASANTA BHAVAN"],
          "Curd Rice" : ["VASNATHA BHAVAN", "VAIGA'S OOTUPURA"],
          "Kebabs" : ["NORTH EXPRESS", "BARBEQUE NATION", "PARAGON"],
          "Broasted" : ["KFC","CHICKING","BURGERKING","COFFEE CUP"],
          "Chaat" : ["NORTH EXPRESS","SEETAPHAL","BARBEQUE NATION"],
          "Waffles" : ["BELGIAN WAFFLE"],
          "Cafe" : ["STARBUCKS", "COSTA COFFEE", "THE MUFFIN HOUSE", "COFFEE CUP"],
          "Falooda / Shake" : ["FALOODA NATION", "FRUIT BAE", "SEETAPHAL", "FROZEN BOTTLE", "MOUZY", "AMUL ICE CREAMS", "COFFEE CUP", "BASKIN ROBBINS", "STARBUCKS", "COLD STONE CREAMERY", "BURGER KING"],
          "Tea / Coffee" : ["CHAI CHAI", "SELFIE TEA", "VAIGA'S OOTUPURA", "OVENLY", "VASANTA BHAVAN", "HALAIS"],
          "North Indian" : ["NORTH EXPRESS", "BARBEQUE NATION"],
          "South Indian" : ["VASANTA BHAVAN", "VAIGA'S OOTUPURA", "HALAIS", "DINDUGAL THALAPPAKKATTI"],
          "Mexican" : ["TACOBELL"],
          "Chinese" : ["RICE & NOODLES", "WOW  MOMO" , "WOW CHINA", "FLAME N GO", "PARAGON"],
          "Italian" : ["PIZZA HUT", "DOMINOES", "PIZZA RICOTTA"],
          "Desserts" : ["AMUL ICE CREAMS", "ICE CREAM CHEF", "BASKIN ROBBINS"],
          "Snacks" : ["SELFIE TEA", "CHAI CHAI", "OVENLY"],
          "Pan Asian" : ["FLAME N GO"]
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
