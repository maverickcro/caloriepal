import { getSortedPostsData } from "@/lib/posts";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import Image from "next/image";

export default function Posts() {
  const posts = getSortedPostsData();
  const fastFoodPosts = posts.filter((post) => post.category === "Fast food");
  const nutritionPosts = posts.filter((post) => post.category === "Nutrition");
  return (
    <>
      <h1 className="text-gradient text-2xl  md:text-4xl font-bold mb-2 text-center">
        let&apos;s simplify health, calories and dieting
      </h1>
      <span className="block pt-1 text-base text-center">
        Explore our blog for easy-to-digest guides on fast food nutrition,
        calorie counts, and healthy dining options. Discover tips for enjoying
        your fast food favorites while keeping health and calories in check.
      </span>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-6 py-12">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.id}`}
            passHref
            key={post.id}
            className="group flex flex-col blog-post bg-white shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-[1.03]"
          >
            <div className="relative w-full h-64 cursor-pointer">
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={200}
                height={200}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">
                {getFormattedDate(post.date)}
              </p>
              <h2 className="text-2xl font-medium leading-tight">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
