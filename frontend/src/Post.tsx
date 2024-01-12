export default function Post() {
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
      />
      <div
        aria-label="content"
        className="my-2 block min-h-48 w-3/4 rounded border border-gray-300 p-3"
        contentEditable={true}
      />
      <button
        type="button"
        className="my-2 w-3/4 rounded bg-blue-600 p-3 text-center text-white focus:outline-none enabled:bg-blue-700 enabled:hover:bg-blue-800 disabled:opacity-75"
        disabled={true}
      >
        Post!
      </button>
    </div>
  );
}
