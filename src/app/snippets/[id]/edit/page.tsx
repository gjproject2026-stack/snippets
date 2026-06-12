import { db } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function SnippetEditPage(props: SnippetShowPageProps) {
    const params = await props.params;
    const id = parseInt(params.id);
    const snippet = await db.snippet.findFirst({
        where: { id }
    });

    if (!snippet) {
        notFound();
    }

    return <SnippetEditForm snippet={snippet} />;
}