import { useEffect, useState } from "react";
import { UserRepository } from "./repository/UserRepository";

type Props = {
  userRepository: UserRepository;
};

export default function SignUp({ userRepository }: Props) {
  const [email, setEmail] = useState<string>("");

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
        <input type="text" aria-label="uname" name="uname" />
        <button
          type="button"
          onClick={() => {
            alert(
              "It's expected to do something! (namely, register a username)",
            );
          }}
        >
          Register
        </button>
      </div>
    </>
  );
}
