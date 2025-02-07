import Form from "@/app/ui/posts/create-form";
import Breadcrumbs from "@/app/ui/posts/breadcrumbs";
import { getAllTags } from "@/app/lib/data/tag";

export default async function Page() {
  const tags = await getAllTags();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Posts", href: "/dashboard/posts" },
          {
            label: "Create Post",
            href: "/dashboard/posts/create",
            active: true,
          },
        ]}
      />
      <Form tags={tags} />
    </main>
  );
}
