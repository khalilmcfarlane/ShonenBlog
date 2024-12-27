import { userProps } from "../page";
import Link from "next/link";

export default async function ProfileDetails({ params }: userProps) {
  return (
    <div>
      <h1>{params.username} Settings</h1>
      <Link href="#">Change username</Link>
      <br></br>
      <Link href="#">Change profile picture</Link>
    </div>
  );
}
