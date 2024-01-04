import { useState, useEffect } from "react";
import axios from "axios";

import "./CommentsComponent.css";

const CommentsComponent = ({ postId, filterRemote, searchTerm }) => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to determine if a comment should be visible
  const isCommentVisible = (commentText) => {
    // sometimes commentText comes back as undefined. Skip it.
    if (!commentText) return;

    return !filterRemote || commentText.split("<p>")[0].includes("REMOTE");
  };

  // filtered and searched comments
  const filteredComments = comments
    .filter((comment) => isCommentVisible(comment.text))
    .filter((comment) =>
      comment.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const postResponse = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${postId}.json`
        );

        setTitle(postResponse.data.title);

        const commentsPromises = postResponse.data.kids.map((commentId) =>
          axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
          )
        );

        const commentsResponses = await Promise.all(commentsPromises);

        // Filter out comments that are marked as 'dead'
        const liveComments = commentsResponses
          .map((response) => response.data)
          .filter((comment) => !comment.dead && !comment.deleted); // Assuming 'dead' is a boolean property of the comment

        setComments(liveComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
      setIsLoading(false);
    };

    fetchComments();
  }, [postId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <hr></hr>
      <h2 className="text-2xl font-semibold text-gray-800 m-4">{title}</h2>
      {filteredComments.map((comment, index) => (
        <div
          key={index}
          className={`comment p-4 m-4 bg-white shadow-lg rounded-lg mb-2 ${
            isCommentVisible(comment.text) ? "" : "hidden"
          }`}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        ></div>
      ))}
    </div>
  );
};

export default CommentsComponent;
