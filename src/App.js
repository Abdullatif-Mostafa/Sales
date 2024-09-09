import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import NavBar from "./component/Home/NavBar";
import Product from "./component/Products/Product";
import Products from "./component/Products/Products";
import { Route, Routes } from "react-router";
import Register from "./component/Register/Register";
import ContactForm from "./component/Contact/Contcat";
import Footer from "./component/Footer/Footer";
import Forgotpassword from "./component/Login/ForgetPassword";
import PaymentPage from "./component/Payment/PaymentPage";
import Profile from "./component/Profile/Profile";
import SettingPage from "./component/Settings/SettingPage";
import PaymentById from "./component/Payment/PaymentById";
import FavoriteProducts from "./component/Products/FavoriteProducts";
import Orders from "./component/Orders/Orders";
import HelpPage from "./component/Help Page/HelpPage";
import PrivacyAndSecurity from "./component/Privacy and Security/PrivacyandSecurity";
import AdvancedTermsOfService from "./component/Terms of services/AdvancedTermsOfService";
import NotificationsPage from "./component/Notifications/Notifications";
import NotFoundPage from "./component/Not Found Page/NotFoundPage";
import Categories from "./component/Categories/Categories";
import CategoryCard from "./component/Categories/CategoryCard";
import CommunicationPage from "./component/Communication Page/CommunicationPage";
import SecuritySettings from "./component/Security Settings/SecuritySettings";
import OffersPage from "./component/Offers/Offers";
import OffersPageDetails from "./component/Offers/OffersPageDetails";
import AboutPage from './component/About/About';
import Cart from './component/Cart/Cart';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Products />
            <CategoryCard/>
            <Footer />
          </>
        }
        ></Route>
        <Route path="/Products" element={
          <>
            <Products />
            <Footer />
          </>
        }></Route>
        <Route path="/Products/:id" element={
          <>
            <Product />
            <Footer />
          </>
        }></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/favoriteProducts" element={
          <>
            <FavoriteProducts />
            <Footer />
          </>
        }></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/about" element={
          <>
            <AboutPage />
            <Footer />
          </>
        }></Route>
        <Route path="/contcat" element={
          <>
            <ContactForm />
            <Footer />
          </>
        }></Route>
        <Route path="/cart" element={
          <>
            <Cart />
            <Footer />
          </>
        }>
        </Route>
        <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
        <Route path="/PaymentPage" element={<PaymentPage />}></Route>
        <Route path="/PaymentById/:productId" element={<PaymentById />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/settings" element={<SettingPage />}></Route>
        <Route path="/orders" element={
          <>
          <Orders />
          <Footer/>
          </>
          }>
        </Route>
        <Route path="/NotificationsPage" element={<NotificationsPage />}></Route>
        <Route path="/CategoryCard" element={<CategoryCard />}></Route>
        <Route path="/CommunicationPage" element={<CommunicationPage />}></Route>
        <Route path="/SecuritySettings" element={<SecuritySettings />}></Route>
        <Route path="/Categories/:category" element={<Categories />}></Route>
        <Route path="/PrivacyAndSecurity" element={
          <>
            <PrivacyAndSecurity />
            <Footer />
          </>
          }></Route>
        <Route path="/helpPage" element={<>
          <HelpPage />
          <Footer />
        </>}
        ></Route>
        <Route path="/AdvancedTermsOfService" element={<>
          <AdvancedTermsOfService />
          <Footer />
        </>}
        ></Route>
        <Route path="/OffersPage" element={
          <>
          <OffersPage/>
          <Footer/>
          </>
        }>
        </Route>
        <Route path="/offersPage/:offerId" element={<OffersPageDetails />}></Route>
        <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </>
  );
}
export default App;