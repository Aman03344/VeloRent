import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviewsForAdmin } from "../features/Review/reviewSlice";
import { toast } from "react-toastify";
import ReviewCard from "../Admin/ReveiwCard"
import ReviewLoader from "../components/ReviewLoader";

const ReviewContainer = () => {
  const { review, isLoadingReview, isErrorReview, messageReview } = useSelector(state => state.review);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getReviewsForAdmin());

    if (isErrorReview && messageReview) {
      toast.error(message);
    }
  }, [isErrorReview, messageReview]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center md:mt-10">
      {
        isLoadingReview ? (<ReviewLoader />) : (review?.userWithReviews?.map((user) =>
          user?.reviews?.map((review) => <ReviewCard key={review._id} review={review} name={user.name} />)
        ))
      }


    </div>
  );
};

export default ReviewContainer;
