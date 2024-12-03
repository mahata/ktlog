import { EmailInput } from "@/component/Input/EmailInput/EmailInput"
import { PasswordInput } from "@/component/Input/PasswordInput/PasswordInput"
import { useAuthRepository } from "@/repository/useAuthRepository"
import { useState } from "react"

export const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const { auth } = useAuthRepository()

  const sendLoginRequest = async () => {
    const authResult = await auth(email, password)
    if (authResult.success) {
      localStorage.setItem("accessToken", authResult.data.accessToken)
      window.location.href = "/"
    } else {
      setErrorMessage("Email or Password does not match")
    }
  }

  return (
    <form className="flex flex-col gap-2 w-96 p-8 outline-2 outline-blue-400 outline-double m-8 rounded">
      <EmailInput email={email} setEmail={setEmail} />
      <PasswordInput password={password} setPassword={setPassword} />
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded bg-blue-800 px-1.5 py-1 text-white shadow-2xl hover:bg-blue-700 hover:shadow-xl"
          onClick={async () => {
            await sendLoginRequest()
          }}
          aria-label="Send login request"
          disabled={!email || !password}
        >
          Login
        </button>
      </div>
      {errorMessage && (
        <div role="alert" className="text-red-500">
          {errorMessage}
        </div>
      )}
    </form>
  )
}
