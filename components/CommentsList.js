import Comment from "./Comment";

export default function CommentsList({
  comments,
  deleteComment,
  handleEditChange,
  handleSetEditCommentId,
  handleEditSubmit,
}) {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
            handleEditChange={handleEditChange}
            handleSetEditCommentId={handleSetEditCommentId}
            handleEditSubmit={handleEditSubmit}
          />
        );
      })}
    </div>
  );
}
