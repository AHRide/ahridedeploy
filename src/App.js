import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPageClient from "./pages/AboutPage/About";
import AboutPageRider from "./pages/AboutPage/About2";
import Test from "./pages/test";
import ClientSignUp from "./pages/Client/client_signup";
import RiderSignUp from "./pages/Rider/rider_signup";
import RiderProfile from "./pages/Rider/RiderProfile";
import ClientProfile from "./pages/Client/ClientProfile";
import ClientHomepage from "./pages/Client/ClientHomepage";
import RiderHomepage from "./pages/Rider/RiderHomepage";
import DisplayUpdatePage from "./pages/delivery-updates/DisplayUpdatePage";
import DisplayOfferPage from "./pages/delivery-offers/DisplayOfferPage";
import FirstPage from "./pages/FirstPage/FirstPage";
import ClientUpdatesTab from "./pages/delivery-updates/UpdateStatus/ClientUpdatesTab";
import { UserProvider } from "./contexts/user.context";
import PrivateRoute from "./pages/PrivateRoute.page";
import StatusOfDelivery from "./pages/Rider/DeliveryStatusOfDeliveryFolder/StatusOfDelivery";
import RiderDeliveryItemInfo from "./pages/Rider/RiderDeliveryInfoFolder/DeliveryItemInfo";
import ClientSignin from "./pages/Client/client_signin";
import RiderSignin from "./pages/Rider/rider_signin";
import BookDelivery from "./pages/book-delivery/BookDelivery";
import AdminHomepage from "./Admin/AdminHomepage";
import AdminRider from "./Admin/AdminRider";
import AdminClient from "./Admin/AdminClient";
import AdminRiderInformation from "./Admin/AdminRiderInformation";
import AdminClientInformation from "./Admin/AdminClientInformation";
import RiderHistoryPage from "./pages/HistoryPage/Rider/RiderHistoryPage";
import RiderHistoryInfo from "./pages/HistoryPage/Rider/RiderHistoryInfo";
import ClientHistoryInfo from "./pages/HistoryPage/Client/ClientHistoryInfo";
import ClientHistoryPage from "./pages/HistoryPage/Client/ClientHistoryPage";
import SigninAdminPage from "./pages/LoginPage/Admin/FormAdminSignin";


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route exact path="/client/signup" element={<ClientSignUp />} />
          <Route exact path="/client/signin" element={<ClientSignin />} />
          <Route exact path="/rider/signup" element={<RiderSignUp />} />
          <Route exact path="/rider/signin" element={<RiderSignin />} />
          <Route path="/admin/signin" element={<SigninAdminPage />} />
          <Route path="/" element={<FirstPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/client/book" element={<BookDelivery />} />
            <Route path="/rider/homepage" element={<RiderHomepage />} />
            <Route path="/client/homepage" element={<ClientHomepage />} />
            <Route path="/rider/about" element={<AboutPageRider />} />
            <Route path="/client/about" element={<AboutPageClient />} />
            <Route path="/client/profile" element={<ClientProfile />} />
            <Route path="/rider/profile" element={<RiderProfile />} />
            <Route path="/delivery-updates" element={<DisplayUpdatePage />} />
            <Route path="/delivery-offers" element={<DisplayOfferPage />} />
            <Route path="/update-status" element={<ClientUpdatesTab />} />
            <Route path="/admin/rider/report" element={<AdminRider />} />
            <Route path="/admin/client/report" element={<AdminClient />} />
           
            <Route
              path="/admin/rider/report/information"
              element={<AdminRiderInformation />}
            />
            <Route
              path="/admin/client/report/information"
              element={<AdminClientInformation />}
            />

            <Route path="/test" element={<Test />} />
            <Route
              path="/rider/status-of-delivery"
              element={<StatusOfDelivery />}
            />
            <Route
              path="/rider/deliveryInfo"
              element={<RiderDeliveryItemInfo />}
            />
            <Route path="/admin/homepage" element={<AdminHomepage />} />
            <Route path="/rider/deliveryHistory" element={<RiderHistoryPage />} />
            <Route path="/rider/RiderHistoryInfo" element={<RiderHistoryInfo />} />
            <Route path="/client/deliveryHistory" element={<ClientHistoryPage />} />
            <Route path="/client/ClientHistoryInfo" element={<ClientHistoryInfo />} />
           
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
