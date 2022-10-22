import Comment from "./Comment";

export default function CommentsList({ comments, deleteComment }) {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
          />
        );
      })}
    </div>
  );
}
