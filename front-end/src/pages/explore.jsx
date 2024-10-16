import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClassicRoom from "../VIEW IMAGE/classic";
import ComfortRoom from "../VIEW IMAGE/comfort";
import DeluxeRoom from "../VIEW IMAGE/deluxe";
import VipRoom from "../VIEW IMAGE/viproom";
import { fetchRatings, storeRating } from "../api/rating";
import Classicroom from "../image/classicroom.png";
import Comfort from "../image/comfort.png";
import Deluxe from "../image/deluxe.png";
import Viproom from "../image/viproom.png";
import Booking from "./Booking";

const hotels = [
  {
    id: 1,
    rating: 5.0,
    reviews: 1,
    price: 1177,
    roomName: "Classic Room",
    description: "A cozy room with modern amenities and a comfortable bed.",
    pricePerHour: 150,
    image: Classicroom,
  },
  {
    id: 2,
    rating: 4.8,
    reviews: 6,
    price: 27313,
    roomName: "Regular Room",
    description:
      "A spacious room with premium furnishings and a beautiful view.",
    pricePerHour: 300,
    image: Comfort,
  },
  {
    id: 3,
    rating: 5.0,
    reviews: 1,
    price: 29464,
    roomName: "Deluxe Room",
    description:
      "An elegant room with luxurious amenities and a hot spring bath.",
    pricePerHour: 500,
    image: Deluxe,
  },
  {
    id: 4,
    rating: 4.2,
    reviews: 27,
    price: 7956,
    roomName: "VIP Room",
    description:
      "A top-tier room with exclusive services and stunning sea views.",
    pricePerHour: 1000,
    image: Viproom,
  },
];

function Explore() {
  const user = useSelector((state) => state.auth.user);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [ratingData, setRatingData] = useState({
    type_of_room_id: null,
    rate: 0,
    comment: "",
  });
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isComfortRoomOpen, setIsComfortRoomOpen] = useState(false);
  const [isVipRoomOpen, setIsVipRoomOpen] = useState(false);
  const [isClassicRoomOpen, setIsClassicRoomOpen] = useState(false);
  const [isDeluxeRoomOpen, setIsDeluxeRoomOpen] = useState(false);
  const [roomRatings, setRoomRatings] = useState([]);
  const [isRatingsOpen, setIsRatingsOpen] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState("");

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setRatingData({ ...ratingData, type_of_room_id: room.id });
  };

  const handleStarClick = (value) => {
    setRatingData({ ...ratingData, rate: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRatingData({ ...ratingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You need to log in to submit a rating.");
      return;
    }

    const token = "";

    storeRating(ratingData, token)
      .then((res) => {
        if (res.ok) {
          toast.success("Rating submitted successfully!");
          setRatingData({
            type_of_room_id: null,
            rate: 0,
            comment: "",
          });
          setSelectedRoom(null);
        } else {
          toast.error(res.message || "Failed to submit rating");
        }
      })
      .catch((err) => {
        console.error("Error submitting rating:", err);
        toast.error("An error occurred while submitting your rating");
      });
  };

  const handleViewRatings = (room) => {
    fetchRatings(room.id)
      .then((ratings) => {
        setRoomRatings(ratings);
        setSelectedRoomName(room.roomName);
        setIsRatingsOpen(true);
      })
      .catch((err) => {
        console.error("Error fetching ratings:", err);
        toast.error(`Failed to fetch ratings: ${err.message}`);
      });
  };

  const handleBookingOpen = () => {
    setIsBookingOpen(true);
  };

  const handleBookingClose = () => {
    setIsBookingOpen(false);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
    setRatingData({
      type_of_room_id: null,
      rate: 0,
      comment: "",
    });
  };

  const handleComfortRoomOpen = () => {
    setIsComfortRoomOpen(true);
  };

  const handleComfortRoomClose = () => {
    setIsComfortRoomOpen(false);
  };

  const handleVipRoomOpen = () => {
    setIsVipRoomOpen(true);
  };

  const handleVipRoomClose = () => {
    setIsVipRoomOpen(false);
  };

  const handleClassicRoomOpen = () => {
    setIsClassicRoomOpen(true);
  };

  const handleClassicRoomClose = () => {
    setIsClassicRoomOpen(false);
  };

  const handleDeluxeRoomOpen = () => {
    setIsDeluxeRoomOpen(true);
  };

  const handleDeluxeRoomClose = () => {
    setIsDeluxeRoomOpen(false);
  };

  const handleRatingsClose = () => {
    setIsRatingsOpen(false);
    setRoomRatings([]);
    setSelectedRoomName("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Explore these unique stays</h1>
      <div style={styles.grid}>
        {hotels.map((hotel) => (
          <div key={hotel.id} style={styles.card}>
            <img
              src={hotel.image}
              alt={hotel.roomName}
              style={styles.image}
              onClick={
                hotel.roomName === "Regular Room"
                  ? handleComfortRoomOpen
                  : hotel.roomName === "VIP Room"
                  ? handleVipRoomOpen
                  : hotel.roomName === "Classic Room"
                  ? handleClassicRoomOpen
                  : hotel.roomName === "Deluxe Room"
                  ? handleDeluxeRoomOpen
                  : undefined
              }
            />
            <div style={styles.info}>
              <div style={styles.name}>{hotel.roomName}</div>
              <div style={styles.rating}>
                {"★".repeat(Math.round(hotel.rating))}
                {"☆".repeat(5 - Math.round(hotel.rating))}
              </div>
              <div style={styles.description}>{hotel.description}</div>
              <div style={styles.pricePerHour}>
                Price per hour:₱{hotel.pricePerHour}
              </div>
              <div style={styles.price}>Price:₱{hotel.price}</div>
              {user ? (
                <>
                  <button
                    style={styles.rateButton}
                    onClick={() => handleRoomClick(hotel)}
                  >
                    Rate
                  </button>
                  <button style={styles.bookButton} onClick={handleBookingOpen}>
                    Book Now
                  </button>
                </>
              ) : (
                <button
                  style={styles.viewRateButton}
                  onClick={() => handleViewRatings(hotel)}
                >
                  View Ratings
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Rate {selectedRoom.roomName}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.starContainer}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={24}
                    color={i < ratingData.rate ? "#ffc107" : "#e4e5e9"}
                    onClick={() => handleStarClick(i + 1)}
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
              <textarea
                name="comment"
                value={ratingData.comment}
                onChange={handleInputChange}
                placeholder="Leave a comment..."
                style={styles.formInput}
              />
              <div style={styles.buttonContainer}>
                <button type="submit" style={styles.button}>
                  Submit
                </button>
                <button
                  type="button"
                  style={styles.button}
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Dialog maxWidth="100%" open={isBookingOpen} onClose={handleBookingClose}>
        <DialogTitle>Booking</DialogTitle>
        <DialogContent>
          <Booking />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBookingClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        maxWidth="100%"
        open={isComfortRoomOpen}
        onClose={handleComfortRoomClose}
      >
        <DialogTitle>View Your Stay Comfort Room</DialogTitle>
        <DialogContent>
          <ComfortRoom />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleComfortRoomClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog maxWidth="100%" open={isVipRoomOpen} onClose={handleVipRoomClose}>
        <DialogTitle>View Your Stay Vip Room</DialogTitle>
        <DialogContent>
          <VipRoom />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVipRoomClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        maxWidth="100%"
        open={isClassicRoomOpen}
        onClose={handleClassicRoomClose}
      >
        <DialogTitle>View Your Stay Classic Room</DialogTitle>
        <DialogContent>
          <ClassicRoom />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClassicRoomClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        maxWidth="100%"
        open={isDeluxeRoomOpen}
        onClose={handleDeluxeRoomClose}
      >
        <DialogTitle>View Your Stay Deluxe Room</DialogTitle>
        <DialogContent>
          <DeluxeRoom />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeluxeRoomClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog maxWidth="md" open={isRatingsOpen} onClose={handleRatingsClose}>
        <DialogTitle>Ratings and Reviews for {selectedRoomName}</DialogTitle>
        <DialogContent>
          {roomRatings.length > 0 ? (
            roomRatings.map((ratings) => (
              <div key={rating.id} style={styles.ratingItem}>
                <div style={styles.starRating}>
                  {[...Array(rating.rate)].map((_, i) => (
                    <FaStar key={i} size={16} color="#ffc107" />
                  ))}
                  {[...Array(5 - ratings.rate)].map((_, i) => (
                    <FaStar key={i} size={16} color="#e4e5e9" />
                  ))}
                </div>
                <p style={styles.commentText}>
                  <strong>Comment:</strong> {ratings.comment}
                </p>
              </div>
            ))
          ) : (
            <p>No ratings available for this room.</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRatingsClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    cursor: "pointer",
  },
  info: {
    padding: "15px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  rating: {
    color: "#f39c12",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  pricePerHour: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  bookButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft: "45px",
  },
  rateButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  viewRateButton: {
    backgroundColor: "#f39c12",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  comment: {
    color: "#f00",
    fontStyle: "italic",
    marginBottom: "10px",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    width: "500px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formInput: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  starContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "10px",
  },
  ratingItem: {
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  starRating: {
    display: "flex",
    marginBottom: "5px",
  },
  commentText: {
    fontSize: "14px",
    color: "#555",
  },
};

export default Explore;
