import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "./loader";

export default function Reviews(){
    const [reviewName, setReviewName] = useState("");
    const [reviewText, setReviewText] = useState(""); 
    const queryClient = useQueryClient();
const { data: reviews, isLoading: isLoadingReviews } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
          const response = await fetch('https://6754592136bcd1eec850e8da.mockapi.io/api/reviews');
          return response.json();
        },
      });
    
      const mutation = useMutation({
        mutationFn: async (newReview) => {
          const response = await fetch('https://6754592136bcd1eec850e8da.mockapi.io/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
          });
          return response.json();
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["reviews"]);
          setReviewName(""); 
          setReviewText(""); 
        },
      });
    
     
    const handleReviewSubmit = (event) => {
        event.preventDefault();
        if (reviewName.trim() === "" || reviewText.trim() === "") return; 
        mutation.mutate({ name: reviewName, text: reviewText }); 
      };
return(
    <div className="reviews_block">
            <div className="reviews_block_wrap">
              <div className="reviews_block_title">
                <h2>Отзывы</h2>
              </div>
              <form className="reviews_create_block" onSubmit={handleReviewSubmit}>
                <div className="reviews_create_wrap">
                  <input
                    className="review_name"
                    type="text"
                    placeholder="Имя"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                  />
                  <input
                    className="review_comm"
                    type="text"
                    placeholder="Ваш отзыв"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)} 
                    required
                  />
                  <input
                    className="review_btn"
                    type="submit"
                    value="Отправить отзыв"
                  />
                </div>
              </form>
    
              <div className="reviews_block_content">
                <div className="reviews_block_content_wrap">
                  {isLoadingReviews ? (
                    <Loader />
                  ) : reviews && reviews.length > 0 ? (
                    reviews.map(review => (
                      <div key={review.id} className="review">
                        <strong>{review.name}</strong>: <p>{review.text}</p>
                      </div>
                    ))
                  ) : (
                    <p>Нет отзывов.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
)}