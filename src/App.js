import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRouteComponent from "./components/ProtectedRouteComponent";


//components:
import Footer from "./components/Footer";
import Header from "./components/Header";

//user components
import RouteWithUserChatComponent from "./components/user/RouteWithUserChatComponent";
//publicly available components
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListPage from "./pages/ProductList";
import RegisterPage from "./pages/RegisterPage";
//protected user Pages
import UserCartDetails from "./pages/user/UserCartDetails";
import UserOrder from "./pages/user/UserOrder";
import UserOrderDetails from "./pages/user/UserOrderDetails";
import UserProfilePage from "./pages/user/UserProfilePage";
//protected Amin Pages
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminChatsPage from "./pages/admin/AdminChatsPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
      <Routes>
        {/* publicly available Routes */}
        <Route element={<RouteWithUserChatComponent/>}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/product-details/:id" element={<ProductDetailsPage/>}/>
          <Route path="/product-list" element={<ProductListPage/>}/>
          <Route path="/product-list/:pageNumParam" element={<ProductListPage/>}/>
          <Route path="/product-list/category/:categoryName" element={<ProductListPage/>}/>
          <Route path="/product-list/category/:categoryName/:pageNumParam" element={<ProductListPage/>}/>
          <Route path="/product-list/search/:searchQuery" element={<ProductListPage/>}/>
          <Route path="/product-list/search/:searchQuery/:pageNumParam" element={<ProductListPage/>}/>
          <Route path="/product-list/category/:categoryName/search/:searchQuery" element={<ProductListPage/>}/>
          <Route path="/product-list/category/:categoryName/search/:searchQuery/:pageNumParam" element={<ProductListPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="*" element="Page 404"/>
        </Route>
        {/* user Protected Routes */}
        <Route element={<ProtectedRouteComponent admin={false}/>}>
          <Route path="/user" element={<UserProfilePage/>}/>
          <Route path="/user/my-order-details/:id" element={<UserOrderDetails/>}/>
          <Route path="/user/my-order" element={<UserOrder/>}/>
          <Route path="/user/my-cart" element={<UserCartDetails/>}/>
        </Route>
      
        
        {/* admin Protected Routes */}
        <Route element={<ProtectedRouteComponent admin={true}/>}>
          <Route path="/admin/users" element={<AdminUserPage/>}/>
          <Route path="/admin/edit-user/:id" element={<AdminEditUserPage/>}/>
          <Route path="/admin/products" element={<AdminProductsPage/>}/>
          <Route path="/admin/create-new-products" element={<AdminCreateProductPage/>}/>
          <Route path="/admin/edit-product/:id" element={<AdminEditProductPage/>}/>
          <Route path="/admin/analytics" element={<AdminAnalyticsPage/>}/>
          <Route path="/admin/chats" element={<AdminChatsPage/>}/>
          <Route path="/admin/order-details/:id" element={<AdminOrderDetailsPage/>}/>
          <Route path="/admin/orders" element={<AdminOrdersPage/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    
      );
}

export default App;
