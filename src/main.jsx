import './index.css'
import ReactDOM from "react-dom/client";
import {StrictMode} from "react";
import {BrowserRouter, Route, Routes} from "react-router";
import Error404 from "./Components/Error404/Error404.jsx";
import MainLayout from "./Layouts/MainLayout/MainLayout.jsx";
import HomeLayout from "./Layouts/HomeLayout/HomeLayout.jsx";
import Services from "./Components/Services/Services.jsx";
import ServiceDetails from "./Components/ServiceDetails/ServiceDetails.jsx";
import Registration from "./Components/Registration/Registration.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import ProfileUpdate from "./Components/ProfileUpdate/ProfileUpdate.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import AddCompany from "./Components/AddCompany/AddCompany.jsx";
import AddService from "./Components/AddService/AddService.jsx";
import AddReview from "./Components/AddReview/AddReview.jsx";
import MyServices from "./Components/MyServices/MyServices.jsx";
import MyReviews from "./Components/MyReviews/MyReviews.jsx";
import UpdateCompanyModal from "./Components/UpdateCompanyModal/UpdateCompanyModal.jsx";
import UpdateServiceModal from "./Components/UpdateServiceModal/UpdateServiceModal.jsx";
import UpdateReviewModal from "./Components/UpdateReviewModal/UpdateReviewModal.jsx";
import LearningTanstackQuery from "./Components/Learning/LearningTanstackQuery.jsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


const root = document.getElementById("root");

// Creating a Tanstack Query client
const queryClient = new QueryClient()


ReactDOM.createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Routes>
                        <Route path={'/'} element={<MainLayout></MainLayout>}>

                            <Route path={'/'} element={<HomeLayout></HomeLayout>}></Route>

                            <Route path={'/services'} element={<Services></Services>}></Route>
                            <Route path={'/service/details/:serviceId'} element={<ServiceDetails></ServiceDetails>}></Route>

                            <Route path={'/auth/registration'} element={<Registration></Registration>}></Route>
                            <Route path={'/auth/sign_in'} element={<SignIn></SignIn>}></Route>
                            <Route path={'/auth/reset_password'} element={<ResetPassword></ResetPassword>}></Route>
                            <Route path={'/auth/user_profile'} element={<PrivateRoute><UserProfile></UserProfile></PrivateRoute>}></Route>
                            <Route path={'/auth/profile_update'} element={<PrivateRoute><ProfileUpdate></ProfileUpdate></PrivateRoute>}></Route>

                            <Route path={'/add_new_company'} element={<PrivateRoute><AddCompany></AddCompany></PrivateRoute>}></Route>
                            <Route path={'/add_new_service'} element={<PrivateRoute><AddService></AddService></PrivateRoute>}></Route>
                            <Route path={'/add_new_review'} element={<PrivateRoute><AddReview></AddReview></PrivateRoute>}></Route>
                            <Route path={'/my_reviews'} element={<PrivateRoute><MyReviews></MyReviews></PrivateRoute>}></Route>
                            <Route path={'/my_services'} element={<PrivateRoute><MyServices></MyServices></PrivateRoute>}></Route>

                            <Route path={'/update_a_company'} element={<PrivateRoute><UpdateCompanyModal></UpdateCompanyModal></PrivateRoute>}></Route>
                            <Route path={'/update_a_service'} element={<PrivateRoute><UpdateServiceModal></UpdateServiceModal></PrivateRoute>}></Route>
                            <Route path={'/update_a_review'} element={<PrivateRoute><UpdateReviewModal></UpdateReviewModal></PrivateRoute>}></Route>

                            <Route path={'/learning'} element={<LearningTanstackQuery></LearningTanstackQuery>}></Route>

                        </Route>
                        <Route path={'*'} element={<Error404></Error404>}></Route>
                    </Routes>
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
);
