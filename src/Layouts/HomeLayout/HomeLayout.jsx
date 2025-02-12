import Banner from "../../Components/Banner/Banner.jsx";
import MeetOurPartners from "../../Components/MeetOurPartners/MeetOurPartners.jsx";
import Newsletter from "../../Components/Newsletter/Newsletter.jsx";
import HowAddingValues from "../../Components/HowAddingValues/HowAddingValues.jsx";
import UserReviews from "../../Components/UserReviews/UserReviews.jsx";


const HomeLayout = () => {
    return (
        <div className={'min-h-[calc(100vh-64px-329px)]'}>
            <Banner></Banner>
            <HowAddingValues></HowAddingValues>
            <MeetOurPartners></MeetOurPartners>
            <UserReviews></UserReviews>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomeLayout;
