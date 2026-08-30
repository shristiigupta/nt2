
import React, { useEffect, useRef, useState } from "react";
import "./Reviews.css";
import { incrementVisit } from "./visitTracker";
import { logVisitor } from "./visitorLogger";

const Reviews = () => {
  const pioneerCarousel = useRef(null);
  const customerCarousel = useRef(null);

  const [customerReviews, setCustomerReviews] = useState([]);
  const [pioneerVideos, setPioneerVideos] = useState([]);

  // NEW: YouTube comment videos
  const [youtubeCommentVideos, setYoutubeCommentVideos] = useState([]);
  const [youtubeComments, setYoutubeComments] = useState({});
  const [expandedComments, setExpandedComments] = useState({});

  // --------------------------------------------------
  // PAGE TITLE
  // --------------------------------------------------
  useEffect(() => {
    document.title = "Customer Reviews | Santulan Holistic Solutions";
  }, []);

  // --------------------------------------------------
  // VISITOR LOGGING
  // --------------------------------------------------
  useEffect(() => {
    logVisitor("Customer Reviews Page");
    incrementVisit("Customer Reviews Page");
  }, []);

  // --------------------------------------------------
  // FETCH DATA FROM GIST
  // --------------------------------------------------
  useEffect(() => {
    const url =
      `https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?ts=${Date.now()}`;

    fetch(url, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load JSON");
        }

        return res.json();
      })
      .then((data) => {
        const values = Object.values(data);

        // Customer Reviews
        const customer = values.filter(
          (item) => item.Category === "customer_reviews"
        );

        // Pioneer Reviews
        const pioneers = values.filter(
          (item) => item.Category === "pioneer_reviews"
        );

        // NEW: Videos whose comments should be displayed
        const commentVideos = values.filter(
          (item) => item.Category === "youtube_comments"
        );

        setCustomerReviews(customer);
        setPioneerVideos(pioneers);
        setYoutubeCommentVideos(commentVideos);
      })
      .catch((err) => {
        console.error("❌ Error loading reviews data:", err);
      });
  }, []);

  // --------------------------------------------------
  // FETCH YOUTUBE COMMENTS
  // --------------------------------------------------
  useEffect(() => {
    if (youtubeCommentVideos.length === 0) {
      return;
    }

    const fetchComments = async () => {
      const commentsData = {};

      for (const video of youtubeCommentVideos) {
        try {
          const response = await fetch(
            `/.netlify/functions/youtube-comments?videoId=${encodeURIComponent(
              video.youtube_id
            )}`
          );

          if (!response.ok) {
            console.error(
              `Failed to fetch comments for ${video.youtube_id}`
            );
            continue;
          }

          const data = await response.json();

          commentsData[video.youtube_id] = data.comments || [];
        } catch (error) {
          console.error(
            `Error fetching comments for ${video.youtube_id}:`,
            error
          );
        }
      }

      setYoutubeComments(commentsData);
    };

    fetchComments();
  }, [youtubeCommentVideos]);

  // --------------------------------------------------
  // ELFSIGHT GOOGLE REVIEWS
  // --------------------------------------------------
  useEffect(() => {
    function initElfsight() {
      if (window.ElfsightApp) {
        window.ElfsightApp.init();
      }
    }

    const existing = document.getElementById("elfsight-script");

    if (!existing) {
      const script = document.createElement("script");

      script.id = "elfsight-script";
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      script.onload = initElfsight;

      document.body.appendChild(script);
    } else {
      initElfsight();
    }
  }, []);

  // --------------------------------------------------
  // SCROLL HANDLERS
  // --------------------------------------------------
  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  // --------------------------------------------------
  // YOUTUBE WATCH URL
  // --------------------------------------------------
  const getWatchUrl = (video) =>
    `https://www.youtube.com/watch?v=${video.youtube_id}`;

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // VIEW MORE / VIEW LESS
  // --------------------------------------------------
  const toggleComments = (videoId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  return (
    <div className="reviews-page">

      {/* ==================================================
          CUSTOMER REVIEWS
      ================================================== */}
      <section className="reviews-section">
        <h1 className="section-heading">
          Customer Reviews
        </h1>

        <div className="carousel-container">

          <button
            className="scroll-btn left"
            onClick={() => scrollLeft(customerCarousel)}
          >
            &#10094;
          </button>

          <div
            className="carousel customer-carousel"
            ref={customerCarousel}
          >
            {customerReviews.map((video, index) => (
              <div key={index} className="pioneer-card">

                <a
                  href={getWatchUrl(video)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                    alt={`Customer Review ${index + 1}`}
                  />

                  <div className="play-overlay">
                    ▶
                  </div>
                </a>

              </div>
            ))}
          </div>

          <button
            className="scroll-btn right"
            onClick={() => scrollRight(customerCarousel)}
          >
            &#10095;
          </button>

        </div>
      </section>


      {/* ==================================================
          GOOGLE REVIEWS
      ================================================== */}
      <section className="reviews-section">

        <div className="google-reviews-wrapper">

          <div
            className="elfsight-app-3c78991c-da6c-4440-9563-33fb19308889"
            data-elfsight-app-lazy
          >
          </div>

        </div>

      </section>


      {/* ==================================================
          SOCIAL MEDIA FEEDBACK
          ONLY SHOWN IF GIST HAS youtube_comments
      ================================================== */}

      {youtubeCommentVideos.length > 0 && (
        <section className="reviews-section social-feedback-section">

          <h1 className="section-heading">
            Social Media Feedback
          </h1>

          <div className="social-feedback-container">

            {youtubeCommentVideos.map((video, videoIndex) => {

              const comments =
                youtubeComments[video.youtube_id] || [];

              // Show only first 3 initially
              const visibleComments = expandedComments[video.youtube_id]
                ? comments
                : comments.slice(0, 3);

              return (
                <div
                  className="social-feedback-video"
                  key={video.youtube_id}
                >



                  {/* VIDEO LINK */}
                  <a
                    href={getWatchUrl(video)}
                    target="_blank"
                    rel="noreferrer"
                    className="social-video-link"
                  >

                    <img
                      src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                      alt={video.title || "YouTube video"}
                    />

                    <div className="play-overlay">
                      ▶
                    </div>

                  </a>


                  {/* COMMENTS */}

                  {comments.length > 0 ? (

                    <div className="youtube-comments-list">

                      {visibleComments.map(
                        (comment, commentIndex) => (

                          <div
                            className="youtube-comment-card"
                            key={commentIndex}
                          >

                            <div className="comment-header">

                              {comment.authorImage && (
                                <img
                                  src={comment.authorImage}
                                  alt={comment.author}
                                  className="comment-author-image"
                                />
                              )}

                              <div className="comment-author-info">

                                <div className="comment-author">
                                  {comment.author}
                                </div>

                                <div className="comment-date">
                                  {formatDate(
                                    comment.publishedAt
                                  )}
                                </div>

                              </div>

                            </div>


                            <div className="comment-text">
                              {comment.text}
                            </div>


                            <div className="comment-likes">
                              👍 {comment.likes || 0}
                            </div>

                          </div>

                        )
                      )}

                    </div>

                  ) : (

                    <p className="no-comments">
                      No comments available for this video.
                    </p>

                  )}


                  {/* VIEW MORE */}

                  {comments.length > 3 && (

                    <button
                      className="view-comments-btn"
                      onClick={() =>
                        toggleComments(video.youtube_id)
                      }
                    >

                      {expandedComments[video.youtube_id]
                        ? "View Less"
                        : `View More (${comments.length - 3} more)`}

                    </button>

                  )}

                </div>
              );
            })}

          </div>

        </section>
      )}


      {/* ==================================================
          PIONEERS
      ================================================== */}

      <section className="reviews-section pioneers-section">

        <h1 className="section-heading">
          What Pioneers Say About Neurotherapy
        </h1>

        <div className="carousel-container">

          <button
            className="scroll-btn left"
            onClick={() => scrollLeft(pioneerCarousel)}
          >
            &#10094;
          </button>

          <div
            className="carousel"
            ref={pioneerCarousel}
          >

            {pioneerVideos.map((video, index) => (

              <div
                key={index}
                className="pioneer-card"
              >

                <a
                  href={getWatchUrl(video)}
                  target="_blank"
                  rel="noreferrer"
                >

                  <img
                    src={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                    alt={`Pioneer Video ${index + 1}`}
                  />

                  <div className="play-overlay">
                    ▶
                  </div>

                </a>

              </div>

            ))}

          </div>

          <button
            className="scroll-btn right"
            onClick={() => scrollRight(pioneerCarousel)}
          >
            &#10095;
          </button>

        </div>

      </section>

    </div>
  );
};

export default Reviews;
