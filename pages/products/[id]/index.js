/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import SimilarProductsList from "../../../components/SimilarProductsList";
import { formatCurrency } from "../../../utilities/formatCurrency";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import db from "../../../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import CommentsList from "../../../components/CommentsList";
import Button from "../../../components/Button";
import { useAuth } from "../../../context/AuthContext";
import { v4 as uuid } from "uuid";
import Rating from "../../../components/Rating";

export default function Product({ product }) {
  const {
    image,
    title,
    price,
    description,
    category,
    id,
    rating: serverSideRating,
    // comments: serverSideComments,
  } = product;
  const { user } = useAuth();
  // const { rate, count } = serverSideRating;

  const formattedPrice = formatCurrency(price);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState();
  const [rating, setRating] = useState(serverSideRating);
  const [editCommentText, setEditCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [userRating, setUserRating] = useState(Math.round(rating.rate));

  function changeColorOnHover(r) {
    console.log(rating);
    console.log(userRating);

    setUserRating(r);
  }

  useEffect(() => {
    changeColorOnHover(Math.round(rating.rate));
  }, [Math.round(rating.rate)]);

  // RATING THE PRODUCT
  async function rateProduct() {
    console.log(userRating, rating.rate, rating.count, rating);
    const docRef = doc(db, "productsList", id);
    await setDoc(
      docRef,
      {
        rating: {
          count: rating.count + 1,
          rate: (
            Math.round(
              ((rating.rate * rating.count + userRating) / (rating.count + 1)) *
                10
            ) / 10
          ).toFixed(1),
        },
        // ratedBy: [...ratedBy, { userId: user.uid, rating: userRating }],
      },
      { merge: true }
    );
  }

  const rateProductReactQuery = () => {
    const queryClient = useQueryClient();
    return useMutation(rateProduct, {
      onSuccess: () => {
        queryClient.invalidateQueries([`get-product-data-${id}`]);
      },
    });
  };

  const { mutate: rateProductTest } = rateProductReactQuery();

  //  GET COMMENTS

  const { isLoading, isError } = useQuery(
    [`get-product-data-${id}`],
    () => {
      return getComments();
    },
    {
      onSuccess: (data) => {
        setComments(data.comments);
        setRating(data.rating);
      },
      onError: () => {
        console.log(error);
      },
    }
  );

  async function getComments() {
    const productRef = doc(db, "productsList", id);
    const productSnapshot = await getDoc(productRef);
    let data = productSnapshot.data();
    return data;
  }

  // ADD COMMENT

  const addCommentReactQuery = () => {
    const queryClient = useQueryClient();
    return useMutation(addComment, {
      onSuccess: () => {
        queryClient.invalidateQueries([`get-product-data-${id}`]);
      },
    });
  };

  const { mutate: addCommentTest } = addCommentReactQuery();

  async function addComment() {
    const docRef = doc(db, "productsList", id);
    await setDoc(
      docRef,
      {
        comments: [
          ...comments,
          { user: user.email, userId: user.uid, text: commentText, id: uuid() },
        ],
      },
      { merge: true }
    );
    setCommentText("");
  }

  // DELETE COMMENT

  const deleteCommentReactQuery = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteComment, {
      onSuccess: () => {
        queryClient.invalidateQueries([`get-product-data-${id}`]);
      },
    });
  };
  async function deleteComment(commentId) {
    const docRef = doc(db, "productsList", id);
    await setDoc(
      docRef,
      {
        comments: comments.filter((c) => c.id !== commentId),
      },
      { merge: true }
    );
  }

  const { mutate: deleteCommentTest } = deleteCommentReactQuery();

  // // // EDIT COMMENT

  function handleEditChange(value) {
    setEditCommentText(value);
  }

  function handleSetEditCommentId(id) {
    setEditCommentId(id);
  }

  async function handleEditSubmit() {
    const docRef = doc(db, "productsList", id);
    const p = comments.map((comment) =>
      comment.id === editCommentId
        ? { ...comment, text: editCommentText }
        : comment
    );
    await setDoc(
      docRef,
      {
        comments: p,
      },
      { merge: true }
    );
  }

  const editCommentReactQuery = () => {
    const queryClient = useQueryClient();
    // don't call the function here
    return useMutation(handleEditSubmit, {
      onSuccess: () => {
        queryClient.invalidateQueries([`get-product-data-${id}`]);
      },
    });
  };

  const { mutate: editCommentTest } = editCommentReactQuery();

  if (!user || isLoading || !comments) return <h1>loading...</h1>;
  return (
    <div className="flex flex-col justify-center items-center p-6 space-y-10">
      <div className="w-[min(90%,500px)]">
        <img src={image} alt="img of the product" />
      </div>
      <div className="">
        <div className="">
          <h1>{title}</h1>
          <div>
            <p>{formattedPrice}</p>
            <Rating
              userRating={userRating}
              rating={rating}
              rateable={user}
              rateProduct={rateProductTest}
              changeColorOnHover={changeColorOnHover}
            />
          </div>
        </div>
        <p className="">{description}</p>
      </div>
      <div className="flex flex-col w-full space-y-4  border p-4 overflow-auto">
        <h1>Comments</h1>
        {user && (
          <div className="flex flex-col items-end space-y-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border resize-none"
              rows={4}
            />
            <Button
              disabled={
                comments.findIndex((comment) => {
                  return comment.userId === user.uid;
                }) !== -1
              }
              type="primary"
              size="sm"
              text="Leave a comment"
              onClick={addCommentTest}
            />
          </div>
        )}
        {isLoading ? (
          <h1>loading...</h1>
        ) : isError ? (
          <h1>error...</h1>
        ) : (
          <CommentsList
            comments={comments}
            deleteComment={deleteCommentTest}
            handleEditChange={handleEditChange}
            handleSetEditCommentId={handleSetEditCommentId}
            handleEditSubmit={editCommentTest}
          />
        )}
      </div>
      <div className="w-full h-auto text-center space-y-8 py-8 border-t border-b  border-neutral-500">
        <p className="text-xl text-primary-200 font-semibold uppercase">
          You may also like
        </p>
        <SimilarProductsList productId={id} category={category} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let product = {};

  const productRef = doc(db, "productsList", context.params.id);
  const productSnapshot = await getDoc(productRef);
  if (productSnapshot.exists()) {
    product = productSnapshot.data();
  }

  return {
    props: {
      product,
    },
  };
};
