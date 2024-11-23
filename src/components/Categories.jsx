import React, { useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.zoom = "80%"; // Set zoom level to 90%
    return () => {
      document.body.style.zoom = "100%"; // Reset on component unmount
    };
  }, []);

  const tiles = [
    {
      id: 1,
      title: "Find Your Shops",
      description: "Find shops and navigate easily through the mall.",
      img_url:
        "https://images.squarespace-cdn.com/content/v1/64073c3afdb5c4737243d022/277c4047-7c06-4a75-b135-af645a3e13c6/designinternational-lulu+mall+trivandrum-thiruvananthapuram-india-plaza+people.jpg",
      buttonText: "Navigate",
      action: () => navigate("/navi"), // Redirects to /navi
    },
    {
      id: 2,
      title: "Explore Our Menu",
      description: "Discover delicious food options and cuisines.",
      img_url:
        "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg",
      buttonText: "Explore",
      action: () => navigate("/explore"), // Redirects to /explore
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: 1,
        background: "",
        marginTop: "-105px",
      }}
    >
      {tiles.map((tile) => (
        <Box
          key={tile.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "",
            borderRadius: "20px",
            border: "2px solid #21005D",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0.8, 0.8, 0.8, 0.8)",
            width: "90%",
            maxWidth: "800px",
            padding: "20px",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h8"
            sx={{
              fontWeight: "bold",
              color: "#21005D",
              marginBottom: "15px",
              fontSize: "1.5rem",
              textAlign: "center",
              width: "100%",
              borderBottom: "2px solid #21005D",
              paddingBottom: "5px",
            }}
          >
            {tile.title}
          </Typography>

          {/* Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            {/* Image Section */}
            <Box
              sx={{
                flexShrink: 0,
                width: "200px",
                height: "200px",
                borderRadius: "20px",
                overflow: "hidden",
                marginRight: "20px",
              }}
            >
              <Box
                component="img"
                src={tile.img_url}
                alt={tile.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  boxShadow: "0 8px 20px rgba(0.8, 0.8, 0.8, 0.8)",
                }}
              />
            </Box>

            {/* Text Section */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: "#000000",
                  marginBottom: "15px",
                  fontSize: "1rem",
                }}
              >
                {tile.description}
              </Typography>

              {/* Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #660660, #a5076b)",
                  color: "#FFF",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "50px",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(to right, #a5076b, #660660)",
                    boxShadow: "0 8px 20px rgba(165, 7, 107, 0.4)",
                  },
                }}
                onClick={tile.action}
              >
                {tile.buttonText}
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Home;
