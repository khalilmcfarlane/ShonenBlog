interface Props {
    params: {
        username: string;
    }
}
export default function ProfileDetails({ params }: Props) {
  return <h1>Details about user {params.username}</h1>;
}

