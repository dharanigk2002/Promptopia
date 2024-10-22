import Feed from "@/components/Feed";

function HomePage() {
  return (
    <section className="flex w-full flex-center flex-col">
      <h1 className="text-center head_text">
        Discover & share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-powered prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
}

export default HomePage;
