import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Blog from "@/lib/models/blog";
import Project from "@/lib/models/project";

interface IBlog {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags?: string[];
  linkedProjects?: string[];
  twitterEmbeds?: string[];
  createdAt: string;
  updatedAt: string;
}

interface IProject {
  _id: string;
  title: string;
  description: string;
}

async function getBlog(id: string): Promise<IBlog | null> {
  try {
    await connectDB();
    const blog = await Blog.findById(id).lean();
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

async function getLinkedProjects(projectIds: string[]): Promise<IProject[]> {
  try {
    const projects = await Project.find({ _id: { $in: projectIds } }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error fetching linked projects:", error);
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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) {
    return { title: "Blog Not Found" };
  }
  return {
    title: `${blog.title} | Harrison Harper`,
    description: blog.content.substring(0, 160),
  };
}

export default async function SingleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  const linkedProjects = blog.linkedProjects?.length
    ? await getLinkedProjects(blog.linkedProjects)
    : [];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      <article className="modern-card p-8 space-y-6">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <div className="flex items-center gap-4 text-gray-500">
            <span>{blog.author}</span>
            <span>•</span>
            <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
            {blog.updatedAt !== blog.createdAt && (
              <>
                <span>•</span>
                <span className="text-sm">Updated {formatDate(blog.updatedAt)}</span>
              </>
            )}
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-teal-500/20 text-teal-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose prose-invert prose-teal max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Twitter Embeds */}
        {blog.twitterEmbeds && blog.twitterEmbeds.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold">Related Tweets</h3>
            <div className="space-y-4">
              {blog.twitterEmbeds.map((embed, index) => (
                <div
                  key={index}
                  className="bg-navy-700 p-4 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: embed }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Linked Projects */}
        {linkedProjects.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold">Related Projects</h3>
            <div className="grid gap-4">
              {linkedProjects.map((project) => (
                <Link
                  key={project._id}
                  href={`/projects`}
                  className="feature-card p-4 block hover:border-teal-500/50"
                >
                  <h4 className="font-medium text-teal-400">{project.title}</h4>
                  <p className="text-sm text-gray-400">{project.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
