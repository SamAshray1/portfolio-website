import React, { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
    const [posts, setPosts] = useState([]);  const getPostData = () => {
      axios
        .get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed//@samuel403")
        .then((res) => {
          setPosts(res.data.items);
        })
        .catch((error) => {
          console.error("Error fetching blog posts:", error);
        });
    };  useEffect(() => {
      getPostData();
    }, []);  return (
        <div className="blog">
        {posts.map((post) => {
          // Extract the first paragraph from the post content
          const parser = new DOMParser();
          const htmlContent = parser.parseFromString(post.content, "text/html");
          const firstParagraph = htmlContent.querySelector("p")?.innerText || "";
          const imageSrc = htmlContent.querySelector("img")?.src;
  
          return (
            <div
              key={post.guid}
              className="blog-item"
            >
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Article visual"
                />
              )}
              <div>
                <h3>{post.title}</h3>
                <p>{firstParagraph}</p>
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          );
        })}
      </div>
      );
  };
  
  export default Blog;
