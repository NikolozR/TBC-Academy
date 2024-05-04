import Link from "next/link";
import Image from "next/image";

function Blog({ blogData, locale }: { blogData: Blog; locale: string }) {
  return (
    <div className="min-w-[400px] my-[20px] mx-auto bg-gray-50 rounded-[5px] overflow-hidden shadow-custom">
      <Image
        src={"/blog.jpg"}
        width={400}
        height={200}
        className="w-full h-auto rounded-tl-[5px] rounded-tr-[5px]"
        alt={blogData?.title}
      />
      <div className="p-[20px]">
        <h2 className="text-[20px] font-bold m-0 mb-[10px]">
          {blogData?.title}
        </h2>
        <Link href={`/${locale}/blogs/${blogData?.id}`}>
          <button>Read More</button>
        </Link>
      </div>
    </div>
  );
}

export default Blog;