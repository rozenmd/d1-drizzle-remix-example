import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";

import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { InferSelectModel } from "drizzle-orm";

import { client } from "~/db/client.server";
import { articles } from "~/db/schema";

export type Article = InferSelectModel<typeof articles>; // return type when queried

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const allArticles = await client(context.env.DB)
    .select({
      slug: articles.slug,
      excerpt: articles.excerpt,
      title: articles.title,
    })
    .from(articles)
    .all();

  if (!allArticles) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json({ articles: allArticles });
};
type LoaderType = typeof loader;

const Articles = () => {
  const data = useLoaderData<LoaderType>();

  const { articles } = data;

  return (
    <>
      {articles.length > 0 ? (
        <main>
          <h1>Articles</h1>
          <div>
            {articles.map((article: Article) => (
              <div key={article.slug}>
                <a href={`/articles/${article.slug}`}>{article.title}</a>
                <p>{article.excerpt}</p>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <div>
          <h1>No results</h1>
        </div>
      )}
    </>
  );
};

export default Articles;
