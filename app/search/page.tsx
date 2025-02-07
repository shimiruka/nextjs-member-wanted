import { Post } from "@/components/search/post";
import { getFilteredPosts } from "@/lib/data/post";
import Search from "@/components/search/search";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const posts = await getFilteredPosts(query);

  return (
    <div>
      <div className="flex justify-center items-center gap-4 mx-20">
        <Search placeholder="Search" />
        <Button>
          <Link href="/search">+</Link>
        </Button>
      </div>
      <section className="container flex m-10 grid grid-cols-2 gap-10 xl:grid-cols-3">
        {posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
          />
        ))}
      </section>
    </div>
  );
}
