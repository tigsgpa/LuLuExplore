import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.zoom = "90%"; // Set zoom level to 90%
    return () => {
      document.body.style.zoom = "100%"; // Reset on component unmount
    };
  }, []);

  const tiles = [
    {
      id: 1,
      title: "Navigate the Mall",
      description: "Find shops and navigate seamlessly through the mall.",
      img_url:
        "https://images.squarespace-cdn.com/content/v1/64073c3afdb5c4737243d022/cbb7f3bd-fa8f-4b8a-9d45-0336e2759184/designinternational-lulu+mall+trivandrum-thiruvananthapuram-india-plaza+and+skylight-cover.jpg",
      buttonText: "Explore your shop",
      action: () => navigate("/navi"), // Redirects to /navi
    },
    {
      id: 2,
      title: "Explore the Food Court",
      description: "Discover a variety of cuisines and dining experiences.",
      img_url:
        "https://cdn-ijnhp.nitrocdn.com/pywIAllcUPgoWDXtkiXtBgvTOSromKIg/assets/images/optimized/rev-5794eaa/www.jaypeehotels.com/blog/wp-content/uploads/2020/09/chinese-1.jpg",
      buttonText: "Explore our menu",
      action: () => navigate("/explore"), // Redirects to /explore
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        marginTop:'-200px',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "76vh",
        gap: "20px",
        padding: "20px",
      }}
    >
      {tiles.map((tile) => (
        <div
          key={tile.id}
          style={{
            width: "100%",
            maxWidth: "350px",
            height: "400px",
            position: "relative",
            backgroundImage: `url(${tile.img_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "15px",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            cursor: "pointer",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow =
              "0px 15px 30px rgba(0, 0, 0, 0.5)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0px 8px 20px rgba(0, 0, 0, 0.3)";
          }}
        >
          {/* Transparent Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255, 255, 255, 0.2)", // Transparent white overlay
              backdropFilter: "blur(1px)", // Adds a glass-like effect
            }}
          ></div>

          {/* Content */}
          <div
            style={{
              zIndex: 2,
              padding: "15px",
              textAlign: "center",
              color: "white",
              boxShadow:"100",
              width: "100%",
              background: "rgba(0, 0, 0, 0.3)", // Slightly transparent black for contrast
              backdropFilter: "blur(1px)", // Enhances the glassmorphism effect
              borderRadius: "10px", // Rounds the edges of the content area
              margin: "10px",
            }}
          >
            <h2
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "10px",
                textShadow: "1px 1px 8px rgba(0, 0, 0, 0.7)",
              }}
            >
              {tile.title}
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                marginBottom: "15px",
                lineHeight: "1.4",
                color: "white",
              }}
            >
              {tile.description}
            </p>
            {/* Single Button */}
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button
                style={{
                  background: "linear-gradient(to right, #660660, #a5076b)", // Updated gradient background
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  padding: "12px 16px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0px 8px 20px rgba(165, 7, 107, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  tile.action();
                }}
                onMouseOver={(e) =>
                  (e.target.style.background =
                    "linear-gradient(to right, #a5076b, #660660)") // Reversed gradient on hover
                }
                onMouseOut={(e) =>
                  (e.target.style.background =
                    "linear-gradient(to right, #660660, #a5076b)") // Original gradient on mouse out
                }
              >
                {tile.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
