import type { Dispatch, SetStateAction } from "react"

type Props = {
  password: string
  setPassword: Dispatch<SetStateAction<string>>
}

export const PasswordInput = ({ password, setPassword }: Props) => {
  return (
    <>
      <label className="content-center font-semibold text-lg" htmlFor="password">
        Password
      </label>
      <input
        className="rounded p-1 border-blue-400 border-2"
        id="password"
        type="password"
        value={password}
        size={24}
        maxLength={256}
        placeholder="Please type your password"
        onChange={(event) => setPassword(event.currentTarget.value)}
        aria-required="true"
        aria-describedby="password-error"
        autoComplete="current-password"
      />
    </>
  )
}
