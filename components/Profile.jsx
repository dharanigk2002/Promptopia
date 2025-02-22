import PromptCard from "./PromptCard";

function Profile({ name, desc, handleEdit, handleDelete, data }) {
  return (
    <section className="w-full">
      <h1 className="head_text blue_gradient text-left">{name} profile</h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;
