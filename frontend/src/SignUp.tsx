import { useEffect, useState } from "react";
import { UserRepository } from "./repository/UserRepository";
import { useNavigate } from "react-router-dom";

type Props = {
  userRepository: UserRepository;
};

export default function SignUp({ userRepository }: Props) {
  const [email, setEmail] = useState<string>("");
  const [uname, setUname] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    userRepository.getMe().then((user) => {
      setEmail(user.email ? user.email : "");
    });
  }, [userRepository]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4l font-semibold leading-5">Let's Sign up!</h2>
      <input
        type="text"
        aria-label="email"
        name="email"
        value={email}
        placeholder="Email Address"
        className="my-2 block w-3/4 rounded border border-gray-300 p-3"
        readOnly
      />
      <input
        type="text"
        aria-label="uname"
        name="uname"
        pattern="[A-Za-z0-9]{1,63}"
        title="Must be only alphanumeric and less than 64 characters"
        placeholder="User Name"
        className="my-2 block w-3/4 rounded border border-gray-300 p-3"
        onChange={(event) => {
          const uname = event.target.value.trim();
          setUname(uname);
          setButtonDisabled(
            uname.length === 0 ||
              0 < document.querySelectorAll("input:invalid").length,
          );
        }}
      />
      <button
        type="button"
        onClick={async () => {
          await userRepository.save({
            email,
            uname,
          });
          navigate("/");
        }}
        className="my-2 w-3/4 rounded bg-blue-600 p-3 text-center text-white focus:outline-none enabled:bg-blue-700 enabled:hover:bg-blue-800 disabled:opacity-75"
        disabled={buttonDisabled}
      >
        Sign up!
      </button>
    </div>
  );
}
