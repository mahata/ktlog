import type { Dispatch, SetStateAction } from "react"

type Props = {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
}

export const EmailInput = ({ email, setEmail }: Props) => {
  return (
    <>
      <label className="content-center font-semibold text-lg" htmlFor="email">
        Email
      </label>
      <input
        className="rounded p-1 border-blue-400 border-2 peer"
        id="email"
        type="email"
        value={email}
        size={24}
        maxLength={256}
        placeholder="Please type your email"
        onChange={(event) => setEmail(event.currentTarget.value)}
        aria-required="true"
        aria-describedby="email-error"
      />
      <div id="error-email" className="hidden peer-invalid:block">
        Invalid Email
      </div>
    </>
  )
}

export default EmailInput
