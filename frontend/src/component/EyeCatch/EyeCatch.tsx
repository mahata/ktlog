import { Link } from "react-router-dom";

export default function EyeCatch() {
  return (
    <div className="flex justify-center">
      <Link to="/">
        <img
          className="mx-0 my-7 rounded-full transition delay-100 hover:scale-110"
          src="/cat.webp"
          alt="Eye Catch Cat Logo"
        />
      </Link>
    </div>
  );
}
