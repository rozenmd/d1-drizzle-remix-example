import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import invariant from "tiny-invariant";
import { eq } from "drizzle-orm";

import { Markdown } from "~/components/Markdown";
import { db } from "~/db/client.server";
import { articles } from "~/db/schema";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { InferSelectModel } from "drizzle-orm";
import type { Env } from "~/types";

export type Article = InferSelectModel<typeof articles>; // return type when queried

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  invariant(params.slug, "slug not provided!");

  const article = await db((context.env as Env).DB)
    .select()
    .from(articles)
    .where(eq(articles.slug, params.slug))
    .get();

  if (!article) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  console.log("article", article);

  return json({ article });
};

const Article = () => {
  const data = useLoaderData<typeof loader>();

  const { article } = data;

  return (
    <div>
      <a href="/">Back</a>
      {article ? (
        <main>
          <h1>{article.title}</h1>
          <p>Published: {new Date(article.publishedOn).toLocaleDateString()}</p>
          <Markdown content={data.article.content} />
        </main>
      ) : (
        <div>
          <h1>No results</h1>
        </div>
      )}
    </div>
  );
};

export default Article;
