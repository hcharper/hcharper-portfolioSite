import Link from "next/link";
import connectDB from "@/lib/db";
import Blog from "@/lib/models/blog";

interface IBlog {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

async function getBlogs(): Promise<IBlog[]> {
  try {
    await connectDB();
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getExcerpt(content: string, maxLength: number = 200): string {
  const plainText = content.replace(/<[^>]*>/g, "");
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + "...";
}

export const metadata = {
  title: "Blog | Harrison Harper",
  description: "Thoughts on web development, technology, and more",
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Blog</h1>
        <p className="text-gray-400 text-lg">
          Thoughts, tutorials, and insights on web development and technology.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="modern-card p-12 text-center">
          <p className="text-gray-400">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <article key={blog._id} className="modern-card p-6 hover:border-teal-500/50 transition-colors">
              <Link href={`/blogs/${blog._id}`} className="block space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
                  <span>•</span>
                  <span>{blog.author}</span>
                </div>
                <h2 className="text-2xl font-semibold hover:text-teal-400 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-400">{getExcerpt(blog.content)}</p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-navy-700 text-gray-300 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="inline-block text-teal-400 hover:text-teal-300">
                  Read more →
                </span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
