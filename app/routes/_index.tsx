import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";

import { db } from "~/db/client.server";
import { articles } from "~/db/schema";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { InferSelectModel } from "drizzle-orm";
import type { Env } from "~/types";

export type Article = InferSelectModel<typeof articles>; // return type when queried
export type QueriedArticle = Pick<Article, "slug" | "excerpt" | "title">;

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const allArticles = await db((context.env as Env).DB)
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

const Articles = () => {
  const data = useLoaderData<typeof loader>();

  const { articles } = data;

  return (
    <>
      {articles.length > 0 ? (
        <main>
          <h1>Articles</h1>
          <div>
            {articles.map((article: QueriedArticle) => (
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
