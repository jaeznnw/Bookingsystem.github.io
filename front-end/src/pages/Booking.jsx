import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import $ from "jquery";
import { storebooking } from "../api/bookings";
import checkAuth from "../hoc/checkAuth";
import { useNavigate } from "react-router-dom";
import "./Booking.css";
import { RoomOptions } from "../component/room-fetch";

function Booking() {
  const user = useSelector((state) => state.auth.user);
  const [roomType, setRoomType] = useState("classicroom");
  const [roomNumber, setRoomNumber] = useState("101");
  const [paymentType, setPaymentType] = useState("0");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  useEffect(() => {
    if (checkInRef.current) {
      flatpickr(checkInRef.current, {
        dateFormat: "Y-m-d",
        onChange: (selectedDates) => {
          setCheckInDate(selectedDates[0].toISOString().split("T")[0]);
        },
      });
    }
    if (checkOutRef.current) {
      flatpickr(checkOutRef.current, {
        dateFormat: "Y-m-d",
        onChange: (selectedDates) => {
          setCheckOutDate(selectedDates[0].toISOString().split("T")[0]);
        },
      });
    }
  }, []);

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
    console.log("Room type selected:", event.target.value);
  };

  const handleRoomNumberChange = (event) => setRoomNumber(event.target.value);
  const handlePaymentTypeChange = (event) => setPaymentType(event.target.value);

  const roomId = $("#roomNumber").val();
  const paymentTypeValue = parseInt(paymentType);

  RoomOptions();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      if (!user || !user.profile || !user?.profile?.user_id) {
        navigate("/login");
        return;
      }

      setShowConfirmation(true); 
    }
  };

  const confirmBooking = () => {
    const body = {
      profile_id: user?.profile?.user_id,
      room_id: roomId,
      payment_type: paymentTypeValue,
      payment_status: 0,
      check_in_date: checkInDate, 
      check_out_date: checkOutDate, 
      room_type: roomType 
    };

    console.log("Booking body:", body);
    console.log("room_id:", roomId);

    setLoading(true);
    storebooking(body)
      .then((res) => {
        console.log("Response:", res);
        if (res?.ok) {
          toast.success(res?.message ?? "Thank you for Booking.!!");
          setIsBooked(true);
        } else {
          console.error("Booking error:", res);
          toast.error(res?.message ?? "Something went wrong.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while booking. Please try again.");
      })
      .finally(() => {
        setLoading(false);
        setShowConfirmation(false);
      });
  };

  const imagePath = `${import.meta.env.BASE_URL}imagesroom/${roomType}.png`;

  return (
    <div className="booking-container">
      {!isBooked ? (
        <div>
          <div className="selector">
            <label htmlFor="roomType" className="textbook">
              Select a type of room:
            </label>
            <select
              id="roomType"
              value={roomType}
              onChange={handleRoomTypeChange}
            >
              <option value="classicroom">Classic Room</option>
              <option value="comfort">Regular Room</option>
              <option value="deluxe">Deluxe Room</option>
              <option value="viproom">VIP Room</option>
            </select>
          </div>
          <div className="selector">
            <label htmlFor="roomNumber" className="textbook">
              Select a room number:
            </label>
            <RoomOptions />
          </div>
          <div className="selector">
            <label htmlFor="paymentType" className="textbook">
              Select a payment type:
            </label>
            <select
              id="paymentType"
              value={paymentType}
              onChange={handlePaymentTypeChange}
            >
              <option value="0">GCash</option>
              <option value="1">Cash on Site</option>
              <option value="2">Credit Card</option>
            </select>
          </div>
          <button className="book-button" disabled={loading} onClick={onSubmit}>
            {loading ? "Booking..." : "Book Now"}
          </button>
          {showConfirmation && (
            <div className="confirmation-dialog">
              <p>Are you sure you want to proceed with the booking?</p>
              <button className="yes" onClick={confirmBooking}>Yes</button>
              <button className="cancel" onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          )}
        </div>
      ) : (
        <div className="success-message">
          Your booking has been successfully completed!
        </div>
      )}
      <div className="image-container">
        <img id="room-image" src={imagePath} alt="Room" />
        <div className="dates-container">
          <div className="date-item">
            <input
              placeholder="Check-in date"
              type="text"
              id="checkInDate"
              className="datepicker"
              ref={checkInRef}
            />
          </div>
          <div className="date-item">
            <input
              placeholder="Check-out date"
              type="text"
              id="checkOutDate"
              className="datepicker"
              ref={checkOutRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(Booking);
