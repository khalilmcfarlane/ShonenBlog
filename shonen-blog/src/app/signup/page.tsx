import layoutStyles from "../css/Layout.module.css";

import SignupForm from "../components/SignupForm";

export default function SignupPage() {
  return (
    <div className={layoutStyles.mainContent}>
      <h1>Signup</h1>
      <SignupForm />
    </div>
  );
}
