'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function editSnippet(id: number, code: string) {
    // Implementation for editing snippet
    await db.snippet.update({
        where: { id },
        data: { code }
    });

    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    // Implementation for deleting snippet
    await db.snippet.delete({
        where: { id }
    });
    revalidatePath("/");
    redirect("/");
}
export async function createSnippet(formState: {message: string}, formData: FormData) {

    try {
    // Check the user's input and make sure They are valid
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
        return {
            message: "Title must be longer."
        }
    }
    if (typeof code !== 'string' || code.length < 10) {
        return {
            message: "Code must be longer."
        }
    }

    // Create a new record in the database
    await db.snippet.create({
        data: {
            title,
            code,
        }
    });

} catch (error: unknown) {
    if (error instanceof Error) {
        return {
            message: error.message
        };
    }
    return {
        message: "Something went wrong."
    };
}
    // Redirect the user back to root route
    revalidatePath("/");
    redirect('/');

}