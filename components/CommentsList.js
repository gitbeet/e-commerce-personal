import Comment from "./Comment";

export default function CommentsList({
  comments,
  deleteComment,
  handleEditChange,
  handleSetEditCommentId,
  handleEditSubmit,
  ratedByData,
}) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        return (
          <Comment
            rating={ratedByData.find(
              (rating) => rating.userId === comment.userId
            )}
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
