import CoverImage from "@/app/_components/cover-image";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  // excerpt: string;
  slug: string;
};

export function PortfolioHero({
  title,
  coverImage,
  // excerpt,
  slug,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/portfolio/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
        </div>
        {/* <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        </div> */}
      </div>
    </section>
  );
}
