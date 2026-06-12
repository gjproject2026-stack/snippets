import Link from "next/link";
import { notFound } from "next/navigation"
import { db } from "@/db";
import * as action from "@/actions";

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 1000));
  const params = await props.params;
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(params.id) }
  });

  if (!snippet) {
    notFound();
  }

  const deleteSnippetAction = action.deleteSnippet.bind(null, snippet.id);

  return <div>
    <div className="flex m-4 justify-between items-center">
      <h1 className="text-xl font-bold">{snippet?.title}</h1>
      <div className="flex gap-4">
        <Link href={`/snippets/${snippet?.id}/edit`} className="border p-2 rounded">
          Edit
        </Link>
        <form action={deleteSnippetAction}>
          <button type="submit" className="border p-2 rounded">
            Delete
          </button>
        </form>
      </div>
    </div>
    <pre className="border rounded bg-gray-100 p-3 border-gray-300">
      <code>{snippet?.code}</code>
    </pre>
  </div>
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((snippet) => ({
    id: snippet.id.toString(),
  }));
}