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
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
        {posts.map((post) => {
          // Extract the first paragraph from the post content
          const parser = new DOMParser();
          const htmlContent = parser.parseFromString(post.content, "text/html");
          const firstParagraph = htmlContent.querySelector("p")?.innerText || "";
          const imageSrc = htmlContent.querySelector("img")?.src;
  
          return (
            <div
              key={post.guid}
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Article visual"
                  style={{ width: "150px", height: "auto", borderRadius: "4px" }}
                />
              )}
              <div>
                <h2 style={{ margin: "0 0 10px", font:"30px", color:"black"}}>{post.title}</h2>
                <p>{firstParagraph}</p>
                <a href={post.link} target="_blank" rel="noopener noreferrer" style={{ color: "#0073e6" }}>
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
