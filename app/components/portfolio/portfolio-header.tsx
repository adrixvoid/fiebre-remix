import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import { Center } from "./ui/center/Center";
import { Title } from "./ui/text/Text";

type Props = {
  title: string;
  coverImage: string;
  date?: string;
  author?: Author;
};

export function PortfolioHeader({ title, coverImage, date, author }: Props) {
  return (
    <div>
      <Center variant="text" style={{ margin: "0 0 4rem" }}>
        <Title size='sm'>Portfolio</Title>
        <PostTitle>{title}</PostTitle>
      </Center>
      {/* <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div> */}
    </div>
  );
}
