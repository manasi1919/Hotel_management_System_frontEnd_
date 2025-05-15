import React from "react";
import ReviewForm from "./ReviewForm";


const EditReview = () => <ReviewForm isEdit={true} />;
//Renders the Review component with a prop isEdit set to true.

export default EditReview;
// The EditReview component is a functional component that renders the Review component with a prop isEdit set to true. This prop is used to determine whether the Review component is in edit mode or not. The Review component is a form that allows users to add or edit a review. By setting the isEdit prop to true, the Review component will render the form in edit mode.