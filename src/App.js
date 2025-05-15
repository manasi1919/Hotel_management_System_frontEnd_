import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './common/Home';
import './App.css';

// Room components
import RoomList from './components/rooms/RoomList';
import EditRoom from './components/rooms/EditRoom';
import ViewRoom from './components/rooms/ViewRoom';
import AddRoom from './components/rooms/AddRoom';
import RoomDetails from './components/rooms/RoomDetails';

// Amenity components
import AmenityList from './components/Amenity/AmenityList';
import AmenityAdd from './components/Amenity/AmenityAdd';
import AmenityEdit from './components/Amenity/AmenityEdit';
import AmenityView from './components/Amenity/AmenityView';

// Reservation components
import ReservationList from './components/reservation/ReservationList';
import AddReservation from './components/reservation/AddReservation';
import SearchReservation from './components/reservation/SearchReservation';
import ViewReservation from './components/reservation/ViewReservation';
import EditReservation from './components/reservation/EditReservation';

// Room Type components
import ViewRoomType from './components/roomType/ViewRoomType';
import EditRoomType from './components/roomType/EditRoomType';
import AddRoomType from './components/roomType/AddRoomType';
import RoomTypeList from './components/roomType/RoomTypeList';

// Hotel components



// Payment components
import PaymentForm from './components/payment/PaymentForm';
import AddPayment from './components/payment/AddPayment';
import PaymantList from './components/payment/PaymentList';
import TotalRevenue from './components/payment/TotalRevenue';
import ViewPayment from './components/payment/ViewPayment';


// Review components
import ReviewList from './components/review/ReviewList';
import AddReview from './components/review/AddReview';
import EditReview from './components/review/EditReview';
import ViewReview from './components/review/ViewReview';
import ReviewsByRating from './components/review/ReviewsByRating';
import RecentReviews from './components/review/RecentReviews';
import AddHotel from './components/hotel/AddHotel ';
import EditHotel from './components/hotel/EditHotel ';
import ViewHotel from './components/hotel/ViewHotel ';
import HotelList from './components/hotel/HotelList ';
import Filters from './components/Booking/Filters';
import BookingPage from './components/Booking/BookingPage';
import RoomSelection from './components/Booking/RoomSelection';
import NavBar from './common/NavBar';
import About from './common/About';
import Contact from './common/Contact';
import Footer from './common/Footer';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Admin from './common/Admin';

function App() {
  return (
    <Router>
      
      <div className="App">
      <NavBar/>
        <Routes>
          {/* booking Routes */}
          <Route path='/' element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/filter" element={<Filters />} />
          <Route path="/room-selection/:location" element={<RoomSelection />} />

          {/* Room Type Routes */}
          <Route path="/book-now" element={<BookingPage />} />
          <Route path="/roomType" element={<RoomTypeList />} />
          <Route path="/add-roomtype" element={<AddRoomType />} />
          <Route path="/edit-roomtype/:id" element={<EditRoomType />} />
          <Route path="/view-roomtype/:id" element={<ViewRoomType />} />

          {/* Room Routes */}
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/edit-room/:id" element={<EditRoom />} />
          <Route path="/view-room/:id" element={<ViewRoom />} />
          <Route path="/roomtype-details/:roomId" element={<RoomDetails />} />
          <Route path='/room-amenity/:roomId' element={<RoomDetails />} />

          {/* Amenity Routes */}
          <Route path='/amenity' element={<AmenityList />} />
          <Route path="/add-amenity" element={<AmenityAdd />} />
          <Route path="/edit-amenity/:id" element={<AmenityEdit />} />
          <Route path="/view-amenity/:id" element={<AmenityView />} />

          {/* Reservation Routes */}
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/add-reservation" element={<AddReservation />} />
          <Route path="/search-reservations" element={<SearchReservation />} />
          <Route path="/edit-reservation/:id" element={<EditReservation />} />
          <Route path="/view-reservation/:id" element={<ViewReservation />} />

          {/* Review Routes */}
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/add-review" element={<AddReview />} />
          <Route path="/edit-review/:id" element={<EditReview />} />
          <Route path="/view-review/:id" element={<ViewReview />} />
          <Route path="/reviews-by-rating" element={<ReviewsByRating />} />
          <Route path="/reviews-by-reservation" element={<RecentReviews />} />

          {/* Hotel Routes */}
          <Route path='/hotel' element={<HotelList />} />
          <Route path='/add-hotel' element={<AddHotel />} />
          <Route path='/edit-hotel/:id' element={<EditHotel />} />
          <Route path='/view-hotel/:id' element={<ViewHotel />} />

          {/* Payment Routes */}
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/FilterByPayment" element={<PaymentForm />} />
          <Route path='/payment-list' element={<PaymantList />} />
          <Route path="/total-revenue" element={<TotalRevenue />} />
          <Route path="/ViewPayment/:id" element={<ViewPayment />} />
          <Route path="/add-payment" element={<AddPayment />} />
          

          <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        </Routes>
        <Footer />  
      </div> 
    </Router>

  );
}

export default App;
