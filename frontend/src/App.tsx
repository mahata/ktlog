import "./App.module.scss";
import Posts from "./Posts";
import { ArticlesRepository } from "./repository/ArticlesRepository";
import Header from "./Header";

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
