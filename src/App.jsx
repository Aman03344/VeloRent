import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import DashboardPage from "./pages/DashboardPage";
import Dashboard from "./Admin/Dashboard";
import CarsManagement from "./Admin/CarsManagement";
import ReveiwContainer from "./Admin/ReveiwContainer";
import Rentals from "./Admin/Rentals";
import { useSelector } from "react-redux";
import PrivateComponent from "./components/PrivateComponent";
import ProfilePage from "./pages/ProfilePage";
import CarDetailPage from "./pages/CarDetailPage";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "react-toastify/dist/ReactToastify.css";
import MyRentals from "./pages/MyRentals";
import RentalDetails from "./components/rentalDetails";
import SearchedCars from "./pages/SearchedCars";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="flex flex-col min-h-screen transition-colors duration-200 overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cars/:id" element={<CarDetailPage />} />
            <Route path="/search/:query" element={<SearchedCars />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-rentals" element={<MyRentals />} />
            <Route path="/my-rentals/:rid" element={<RentalDetails />} />

            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<PrivateComponent />}>
              <Route path="" element={<DashboardPage />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="rentals" element={<Rentals />} />
                <Route path="cars" element={<CarsManagement />} />
                <Route path="reviews" element={<ReveiwContainer />} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
   
      </div>
    </Router>
  );
};

export default App;
