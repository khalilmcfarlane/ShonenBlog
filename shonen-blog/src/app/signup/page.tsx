import layoutStyles from "../css/Layout.module.css";

import SignupForm from "../components/SignupForm";
import { NavbarSimple } from "../components/Navbar";

export default function SignupPage() {
  return (
    <div className={layoutStyles.container}>
      <NavbarSimple />
      <div className={layoutStyles.mainContent}>
        <h1>Signup</h1>
        <SignupForm />
      </div>
    </div>
  );
}
