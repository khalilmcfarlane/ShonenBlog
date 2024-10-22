interface Props {
    params: {
        postId: string;
    }
}
export default function PostDetails({ params }: Props) {
  return <h1>Details about post {params.postId}</h1>;
}

