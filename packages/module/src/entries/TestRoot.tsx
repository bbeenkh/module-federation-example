import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import Providers from "@/components/layouts/Providers";

// Jotai counter atom
const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div
      style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>Jotai Counter</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{count}</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setCount((c) => c - 1)}>-1</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
    </div>
  );
}

interface Post {
  id: number;
  title: string;
  body: string;
}

function PostList() {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=10").then(
        (res) => res.json(),
      ),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div
      style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>TanStack Query - Posts</h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {data?.map((post) => (
          <li
            key={post.id}
            style={{
              padding: "8px",
              background: "#f9f9f9",
              borderRadius: "4px",
            }}
          >
            <strong>
              {post.id}. {post.title}
            </strong>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#666" }}>
              {post.body.slice(0, 80)}...
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TestRoot({ date }: { date: string }) {
  return (
    <Providers>
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "600px",
        }}
      >
        <h2>Module Federation Remote Module</h2>
        <Counter />
        <PostList />
      </div>
    </Providers>
  );
}
