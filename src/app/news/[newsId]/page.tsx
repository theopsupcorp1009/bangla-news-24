import { ArticleBlock, ArticleDetails, ArticleResponse, SectionArticle } from "@/types/Sections";
import Image from "next/image";
import { notFound } from "next/navigation";


const findImageUrl = (block: ArticleBlock): string | null => {
  const possibleKeys = [
    "imageUrl",
    "imageURL",
    "image",
    "src",
    "url",
    "originalUrl",
    "original",
    "thumbnailUrl",
  ];

  // Check common direct properties
  for (const key of possibleKeys) {
    const value = block[key];

    if (
      typeof value === "string" &&
      /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(value)
    ) {
      return value;
    }
  }

  // Search nested objects
  for (const value of Object.values(block)) {
    if (value && typeof value === "object") {
      const nested = findImageUrl(value as ArticleBlock);

      if (nested) {
        return nested;
      }
    }
  }

  return null;
};

// --------------------------------------------------
// Find text inside a block
// --------------------------------------------------

const findBlockText = (block: ArticleBlock): string | null => {
  if (typeof block.text === "string" && block.text.trim()) {
    return block.text;
  }

  if (typeof block.title === "string" && block.title.trim()) {
    return block.title;
  }

  return null;
};

// --------------------------------------------------
// Find caption
// --------------------------------------------------

const findCaption = (block: ArticleBlock): string | null => {
  if (typeof block.caption === "string" && block.caption.trim()) {
    return block.caption;
  }

  const possibleKeys = [
    "imageCaption",
    "alt",
    "imageAlt",
    "description",
  ];

  for (const key of possibleKeys) {
    const value = block[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return null;
};

// --------------------------------------------------
// Find a normal URL
// --------------------------------------------------

const findLink = (block: ArticleBlock): string | null => {
  const possibleKeys = ["href", "link", "url"];

  for (const key of possibleKeys) {
    const value = block[key];

    if (
      typeof value === "string" &&
      /^https?:\/\//i.test(value)
    ) {
      return value;
    }
  }

  return null;
};

// --------------------------------------------------
// Article Body Renderer
// --------------------------------------------------

const ArticleBody = ({
  body,
}: {
  body: ArticleBlock[];
}) => {
  return (
    <div className="text-[18px] leading-[1.9] text-gray-800 text-justify">
      {body.map((block, index) => {
        const type = block.type?.toLowerCase() || "";
        const imageUrl = findImageUrl(block);
        const text = findBlockText(block);
        const caption = findCaption(block);
        const link = findLink(block);

        // ------------------------------------------
        // IMAGE
        // ------------------------------------------

        if (
          imageUrl ||
          type.includes("image") ||
          type.includes("photo")
        ) {
          if (!imageUrl) {
            return null;
          }

          return (
            <figure key={index} className="my-8">
              <Image
                src={imageUrl}
                alt={caption || "Article image"}
                width={960}
                height={540}
                className="w-full h-auto object-cover"
              />

              {caption && (
                <figcaption className="mt-2 text-sm leading-relaxed text-gray-500">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }

        // ------------------------------------------
        // HEADING
        // ------------------------------------------

        if (
          type.includes("heading") ||
          type.includes("headline") ||
          type === "title"
        ) {
          if (!text) {
            return null;
          }

          return (
            <h2
              key={index}
              className="mt-10 mb-5 text-2xl md:text-3xl font-bold leading-tight text-gray-900"
            >
              {text}
            </h2>
          );
        }

        // ------------------------------------------
        // LINK
        // ------------------------------------------

        if (
          type.includes("link") &&
          link &&
          text
        ) {
          return (
            <p key={index} className="mb-6">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b80000] underline"
              >
                {text}
              </a>
            </p>
          );
        }

        // ------------------------------------------
        // PARAGRAPH / TEXT
        // ------------------------------------------

        if (text) {
          return (
            <p
              key={index}
              className="mb-6 whitespace-pre-line"
            >
              {text}
            </p>
          );
        }

        return null;
      })}
    </div>
  );
};

// ==================================================
// NEWS DETAILS PAGE
// ==================================================

const NewsDetails = async ({
  params,
}: {
  params: { newsId: string };
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  // Article doesn't exist / API request failed
  if (!res.ok) {
    notFound();
  }

  const data: ArticleResponse = await res.json();

  // API responded but article isn't available
  if (!data.success || !data.data) {
    notFound();
  }

  const news: ArticleDetails = data.data;

  // ------------------------------------------------
  // Description / Summary
  // ------------------------------------------------

  const descriptionText =
    news.description?.blocks
      ?.map((block: ArticleBlock) => block.text)
      .filter(
        (text): text is string =>
          typeof text === "string" &&
          text.trim().length > 0
      )
      .join("\n\n");

  return (
    <main className="bg-white">
      <article className="max-w-3xl mx-auto p-5 md:p-0 lg:p-0">

        {/* =========================================
            CATEGORY
        ========================================= */}

        <p className="mb-4 text-sm font-semibold text-[#b80000]">
          {news.category}
        </p>

        {/* =========================================
            TITLE
        ========================================= */}

        <h1 className="text-3xl md:text-5xl font-bold leading-[1.2] tracking-tight text-gray-900">
          {news.title}
        </h1>

        {/* =========================================
            DESCRIPTION / SUMMARY
        ========================================= */}

        {descriptionText && (
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-gray-600 whitespace-pre-line">
            {descriptionText}
          </p>
        )}

        {/* =========================================
            DATE / SOURCE
        ========================================= */}

        <div className="mt-6 pb-5 border-b border-gray-200">
          {news.firstPublished && (
            <p className="text-sm text-gray-500">
              প্রকাশিত:{" "}
              {new Date(
                news.firstPublished
              ).toLocaleString("bn-BD", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          )}
        </div>

        {/* =========================================
            ARTICLE BODY
        ========================================= */}

        <div className="mt-8">
          {news.body?.length > 0 ? (
            <ArticleBody body={news.body} />
          ) : (
            // Fallback if body isn't available
            // but text is available

            <div className="text-[18px] leading-[1.9] text-gray-800">
              {news.text
                .split(/\n\s*\n/)
                .filter(
                  (paragraph: string) => paragraph.trim()
                )
                .map((paragraph: string, index:number) => (
                  <p
                    key={index}
                    className="mb-6 whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          )}
        </div>

        {/* =========================================
            TAGS
        ========================================= */}

        {news.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
};

export default NewsDetails;