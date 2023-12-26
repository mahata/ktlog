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
    <>
      <div>Let's Sign up!</div>
      <div>
        <input
          type="text"
          aria-label="email"
          name="email"
          value={email}
          readOnly
        />
        <input
          type="text"
          aria-label="uname"
          name="uname"
          pattern="[A-Za-z0-9]{1,63}"
          title="Must be only alphanumeric and less than 64 characters"
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
          disabled={buttonDisabled}
        >
          Sign up!
        </button>
      </div>
    </>
  );
}
