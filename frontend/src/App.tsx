import { Link } from "react-router-dom";
import "./App.css";

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
