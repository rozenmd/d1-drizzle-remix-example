import { Suspense } from "react";
import { Await, useLoaderData } from "@remix-run/react";
import { defer } from "@remix-run/cloudflare";

import { db } from "~/db/client.server";
import { articles } from "~/db/schema";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { InferSelectModel } from "drizzle-orm";
import type { Env } from "~/types";

export type Article = InferSelectModel<typeof articles>; // return type when queried
export type QueriedArticle = Pick<Article, "slug" | "excerpt" | "title">;

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const allArticles = db((context.env as Env).DB)
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

  return defer({ articles: allArticles });
};

const Articles = () => {
  const data = useLoaderData<typeof loader>();

  const { articles } = data;

  return (
    <main>
      <h1>Articles</h1>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/defer">Home with Deferred Loading</a>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={articles}>
          {(articles) => (
            <div>
              {articles.map((article: QueriedArticle) => (
                <div key={article.slug}>
                  <a href={`/articles/${article.slug}`}>{article.title}</a>
                  <p>{article.excerpt}</p>
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </main>
  );
};

export default Articles;
