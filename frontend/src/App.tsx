import { Link } from "react-router-dom";
import "./App.scss";

export default function App() {
  return (
    <div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>Posts</div>
    </div>
  );
}
