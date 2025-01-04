import type { Route } from "./+types/about";

export function loader({ context }: Route.LoaderArgs) {
  const fromTheLoader = "Hello from the about loader";
  return { message: context.VALUE_FROM_VERCEL, fromTheLoader };
}

export default function About() {
  return <div>About</div>;
}
