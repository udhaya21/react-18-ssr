import Html from './Html';

export default function App({ assets, posts }) {
  return (
    <Html assets={assets} title="React 18 SSR" posts={posts}>
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
