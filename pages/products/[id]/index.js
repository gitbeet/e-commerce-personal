/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { v4 as uuid } from "uuid";
import { formatCurrency } from "../../../utilities/formatCurrency";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import db from "../../../firebase/config";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import SimilarProductsList from "../../../components/SimilarProductsList";
import CommentsList from "../../../components/CommentsList";
import Button from "../../../components/Button";
import Rating from "../../../components/Rating";
import AddToCart from "../../../components/AddToCart";

export default function Product({ product }) {
  const {
    image,
    title,
    price,
    description,
    category,
    id,
    comments: serverSideComments,
    rating: serverSideRating,
    ratedBy,
  } = product;
  const { user } = useAuth();

  const formattedPrice = formatCurrency(price);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(serverSideComments);
  const [rating, setRating] = useState(serverSideRating);
  const [editCommentText, setEditCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [userRating, setUserRating] = useState(Math.round(rating.rate));
  const [ratedByUser, setRatedByUser] = useState(false);
  const [alreadyRatedMessage, setAlreadyRatedMessage] = useState(false);
  const [ratedByData, setRatedByData] = useState(ratedBy);

  function toggleAlreadyRatedMessage() {
    if (!ratedByUser) return;
    setAlreadyRatedMessage(true);

    setTimeout(() => {
      setAlreadyRatedMessage(false);
    }, 2000);
  }

  function changeUserRatingOnHover(r) {
    setUserRating(r);
  }

  useEffect(() => {
    changeUserRatingOnHover(Math.round(rating.rate));
  }, [rating.rate]);

  // --------------------- GET PRODUCT DATA ---------------------

  const { isLoading, isError } = useQuery(
    [`get-product-data-${id}`],
    () => {
      return getComments();
    },
    {
      onSuccess: (data) => {
        setComments(data.comments);
        setRating(data.rating);
        setRatedByData(data.ratedBy);
        if (!user) return;
        if (
          data.ratedBy.findIndex((rating) => rating.userId === user.uid) !== -1
        ) {
          setRatedByUser(true);
        } else {
          setRatedByUser(false);
        }
      },
      onError: () => {
        console.log(isError);
      },
    }
  );

  async function getComments() {
    const productRef = doc(db, "productsList", id);
    const productSnapshot = await getDoc(productRef);
    let data = productSnapshot.data();
    return data;
  }

  // -----------------------------------------------------------

  // --------------------- RATING THE PRODUCT ------------------

  async function rateProduct() {
    if (ratedByUser) return;
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
      },
      { merge: true }
    );
    await updateDoc(docRef, {
      ratedBy: arrayUnion({ userId: user.uid, rating: userRating }),
    });
  }

  const rateProductReactQuery = () => {
    const queryClient = useQueryClient();
    return useMutation(rateProduct, {
      onSuccess: () => {
        queryClient.invalidateQueries([`get-product-data-${id}`]);
      },
    });
  };

  const { mutate: rateProductMutate } = rateProductReactQuery();

  // -------------------------------------------------------

  // --------------------- ADD COMMENT ---------------------

  async function addComment() {
    const docRef = doc(db, "productsList", id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        user: user.email,
        userId: user.uid,
        text: commentText,
        id: uuid(),
      }),
    });
    setCommentText("");
  }

  const addCommentReactQuery = () => {
    const queryClient = useQueryClient();
    return useMutation(addComment, {
      onSuccess: () => {
        queryClient.invalidateQueries([`get-product-data-${id}`]);
      },
    });
  };

  const { mutate: addCommentMutate } = addCommentReactQuery();

  // ----------------------------------------------------------

  // --------------------- DELETE COMMENT ---------------------

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

  const { mutate: deleteCommentMutate } = deleteCommentReactQuery();

  // -----------------------------------------------------------

  // --------------------- EDIT COMMENT ---------------------

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

  const { mutate: editCommentMutate } = editCommentReactQuery();

  // -----------------------------------------------------------

  if (isLoading || !comments) return <h1>loading...</h1>;
  return (
    <div className="flex flex-col justify-center items-center p-6 space-y-10 pt-20">
      <div className="w-[min(90%,500px)]">
        <img src={image} alt="img of the product" />
      </div>
      <div className="">
        <div className="">
          <h1>{title}</h1>
          <div>
            <div className="flex flex-col py-4 space-y-2">
              <div>
                <div className="flex space-x-2 w-full">
                  <p>{formattedPrice}</p>
                  <Rating
                    userRating={userRating}
                    rating={rating}
                    rateable={user && !ratedByUser}
                    rateProduct={rateProductMutate}
                    changeUserRatingOnHover={changeUserRatingOnHover}
                    toggleAlreadyRatedMessage={toggleAlreadyRatedMessage}
                  />
                </div>

                <p
                  className={
                    alreadyRatedMessage
                      ? "text-danger-500 opacity-75 transition-all"
                      : "opacity-0  transition-all"
                  }
                >
                  You have already rated this product.
                </p>
              </div>
              <div className="self-end">
                <AddToCart product={product} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="font-semibold text-lg">Description</h1>
          <p className="text-neutral-400">{description}</p>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-4 py-6   border-neutral-500 rounded-md overflow-auto">
        <p className="py-2 text-xl font-semibold uppercase bg-gradient-to-r   from-primary-600 to-primary-550 via-primary-500  text-neutral-900 text-center w-full">
          Client opinions
        </p>
        {user && (
          <div className="flex flex-col items-end space-y-4 py-10 ">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border rounded-md border-neutral-500 resize-none p-2 focus:border-primary-500"
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
              onClick={addCommentMutate}
            />
          </div>
        )}
        {isLoading ? (
          <h1>loading...</h1>
        ) : isError ? (
          <h1>error...</h1>
        ) : (
          <CommentsList
            ratedByData={ratedByData}
            comments={comments}
            deleteComment={deleteCommentMutate}
            handleEditChange={handleEditChange}
            handleSetEditCommentId={handleSetEditCommentId}
            handleEditSubmit={editCommentMutate}
          />
        )}
      </div>
      <div className="w-full h-auto text-center space-y-8 py-8   border-neutral-500">
        <p className="py-2 text-xl font-semibold uppercase bg-gradient-to-r   from-primary-600 to-primary-550 via-primary-500 text-neutral-900">
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
