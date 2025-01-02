import layoutStyles from "../css/Layout.module.css";

import SignupForm from "../components/SignupForm";
import { Title } from "@mantine/core";

export default function SignupPage() {
  return (
    <div className={layoutStyles.mainContent}>
      <Title ta={"center"}>Signup</Title>
      <SignupForm />
    </div>
  );
}
