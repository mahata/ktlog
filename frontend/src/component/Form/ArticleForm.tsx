import { useArticleRepository } from "@/repository/useArticleRepository"
import { useState } from "react"

export const ArticleForm = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [errorMessage, _] = useState("")
  const { post } = useArticleRepository()

  const sendArticle = async () => {
    const postResponse = await post(title, content)
    postResponse.success ? window.location.reload() : console.error(postResponse.errorMessage)
  }

  return (
    <form className="flex flex-col gap-2">
      <label className="content-center font-semibold text-lg" htmlFor="title">
        Title
      </label>
      <input
        className="rounded p-1 border-blue-400 border-2"
        id="title"
        type="text"
        value={title}
        size={24}
        maxLength={256}
        placeholder="Please type your article title"
        onChange={(event) => setTitle(event.currentTarget.value)}
        aria-required="true"
        aria-invalid={0 < errorMessage.length}
        aria-describedby="title-error"
      />
      {/* biome-ignore lint/a11y/noLabelWithoutControl: It's for contentEditable */}
      <label id="editor-label" className="content-center font-semibold text-lg">
        Content
      </label>
      <div
        id="editor"
        contentEditable={true}
        onInput={(e) => {
          setContent(e.currentTarget.textContent as string)
        }}
        className="rounded border-blue-400 border-2 h-48"
        aria-labelledby="editor-label"
      />
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded bg-blue-800 px-1.5 py-1 text-white shadow-2xl hover:bg-blue-700 hover:shadow-xl"
          onClick={async () => {
            await sendArticle()
          }}
          disabled={!title || !content}
        >
          Post
        </button>
      </div>
    </form>
  )
}
