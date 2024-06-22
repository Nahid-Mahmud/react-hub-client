export const singlePostLoader = ({ params }) => {
  const data = fetch(`${import.meta.env.VITE_baseUrl}/posts/${params.id}`);
  return data;
};
