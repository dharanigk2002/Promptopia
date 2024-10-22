"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

function Feed() {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchresults] = useState(null);
  const { data: session } = useSession();
  function handleSearchChange(e) {
    const text = e.target.value.toLowerCase();
    const filteredPosts = posts.filter(
      (post) =>
        post.tag.toLowerCase().includes(text) ||
        post.creator.username.toLowerCase().includes(text) ||
        post.prompt.toLowerCase().includes(text)
    );
    setSearchresults(filteredPosts);
  }
  useEffect(() => {
    session?.user &&
      (async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPosts(data);
      })();
  }, [session?.user]);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username"
          // value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={searchResults || posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;
