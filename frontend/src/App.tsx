import "./App.scss";
import Posts from "./Posts.tsx";
import { ArticlesRepository } from "./repository/ArticlesRepository.ts";
import Header from "./Header.tsx";

type Props = {
  articlesRepository: ArticlesRepository;
};

export default function App({ articlesRepository }: Props) {
  return (
    <div>
      <Header />
      <Posts articlesRepository={articlesRepository} />
    </div>
  );
}
