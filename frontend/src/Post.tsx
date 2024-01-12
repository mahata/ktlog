import { useEffect, useState } from "react";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const tl = title.length;
    const cl = content.length;
    setButtonDisabled(tl === 0 || cl === 0);
  }, [title, content]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4l font-semibold leading-5">
        Let's write up an article!
      </h2>
      <input
        type="text"
        name="title"
        aria-label="title"
        placeholder="Title"
        className="my-2 block w-3/4 rounded border border-gray-300 p-3"
        onChange={(event) => {
          setTitle(event.target.value.trim());
        }}
      />
      <div
        aria-label="content"
        className="my-2 block min-h-48 w-3/4 rounded border border-gray-300 p-3"
        contentEditable={true}
        onInput={(event) => {
          setContent(event.currentTarget.innerText);
        }}
      />
      <button
        type="button"
        className="my-2 w-3/4 rounded bg-blue-600 p-3 text-center text-white focus:outline-none enabled:bg-blue-700 enabled:hover:bg-blue-800 disabled:opacity-75"
        disabled={buttonDisabled}
      >
        Post!
      </button>
    </div>
  );
}
