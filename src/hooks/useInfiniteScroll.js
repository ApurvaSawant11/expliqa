import { useEffect, useRef, useState } from "react";

const useInfiniteScroll = (feedPosts) => {
  const [pageNumber, setPageNumber] = useState(1);
  const lastElementRef = useRef(null);
  const feedPostsLength = feedPosts.length;
  const hasMorePosts = pageNumber <= Math.ceil(feedPostsLength / pageNumber);
  const [showLoader, setShowLoader] = useState(false);

  let timeoutID = null;

  const handleObserver = (entries) => {
    const [target] = entries;

    if (target.isIntersecting && hasMorePosts) {
      setShowLoader(true);
      timeoutID = setTimeout(() => {
        setShowLoader(false);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }, 900);
    }
  };

  useEffect(() => {
    const reference = lastElementRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });

    if (reference) observer.observe(reference);

    return () => {
      if (timeoutID) clearTimeout(timeoutID);
      if (reference) observer.unobserve(reference);
    };
  }, [hasMorePosts, handleObserver]);

  return { lastElementRef, pageNumber, hasMorePosts, showLoader };
};

export { useInfiniteScroll };
