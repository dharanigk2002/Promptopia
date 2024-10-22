"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

function PromptCard({ post, handleTagClick, handleDelete, handleEdit }) {
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  function handleCopy() {
    setCopied(post.prompt);
    window.navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-center gap-5">
        <div className="flex justify-start items-center gap-3 cursor-pointer flex-1">
          <Image
            src={post.creator.image}
            width={40}
            height={40}
            alt={post.creator.username}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="text-gray-900 font-santoshi font-semibold">
              {post.creator.username}
            </h3>
            <p>{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="icon"
          />
        </div>
      </div>
      <p className="my-4 font-santoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="blue_gradient text-sm font-inter cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm cursor-pointer green_gradient"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm cursor-pointer orange_gradient"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
