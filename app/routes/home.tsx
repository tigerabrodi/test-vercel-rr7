import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useEffect } from "react";
import { Form, useFetcher, useNavigation } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  const fromTheLoader = "Hello from the loader";
  return { message: context.VALUE_FROM_VERCEL, fromTheLoader };
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isAddingComment = navigation.formData?.get("intent") === "COMMENT";
  const commentObj = Object.fromEntries(navigation.formData || []);

  return (
    <div>
      <Welcome message={loaderData.message} />
      <Form method="post">
        <input type="text" name="name" />
        <input type="hidden" name="intent" value="COMMENT" />
        <button type="submit">Submit</button>
      </Form>

      {/* above the first one, maybe we'd use react fragment? */}
      {isAddingComment && <Comment comment={commentObj} />}

      {/* Imagine a bunch of comments here mapped out */}
    </div>
  );
}

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  let title = formData.get("name");

  return { title };
}
