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
    <div className="min-h-screen bg-navy px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text mb-8 sm:mb-12 lg:mb-16 font-bold mt-4 pb-2">Blogs</h1>
      </div>

      {blogs.length === 0 ? (
        <div className="modern-card p-12 text-center rounded-2xl">
          <p className="text-gray-400">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-6 max-w-7xl">
          {blogs.map((blog) => (
            <article key={blog._id} className="modern-card p-4 sm:p-6 hover:border-teal-500/50 transition-colors">
              <Link href={`/blogs/${blog._id}`} className="block space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
                  <span>•</span>
                  <span>{blog.author}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white hover:text-teal-400 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">{getExcerpt(blog.content)}</p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-navy-light/50 border border-teal/20 rounded-lg text-teal text-xs sm:text-sm font-medium"
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
