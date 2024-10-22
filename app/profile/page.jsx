"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    session?.user.id &&
      (async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      })();
  }, []);
  async function handleDelete(post) {
    const isConfirm = confirm("Are you sure want to delete?");
    if (!isConfirm) return;
    try {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });

      const filteredPosts = posts.filter((item) => item._id !== post._id);

      setPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`);
  }
  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;
