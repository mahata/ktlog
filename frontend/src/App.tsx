import "./App.module.scss";
import Articles from "./Articles";
import { ArticlesRepository } from "./repository/ArticlesRepository";
import Header from "./Header";
import EyeCatch from "./EyeCatch";

type Props = {
  articlesRepository: ArticlesRepository;
};

export default function App({ articlesRepository }: Props) {
  return (
    <div>
      <Header />
      <EyeCatch />
      <Articles articlesRepository={articlesRepository} />
    </div>
  );
}
