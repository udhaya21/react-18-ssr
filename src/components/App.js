import Html from './Html';

export default function App({ assets, posts }) {
  return (
    <Html assets={assets} title="Simple booking page" posts={posts}>
      {posts.map((post) => {
        return (
          <ul key={post.id}>
            <li>{post.title}</li>
          </ul>
        );
      })}
    </Html>
  );
}
