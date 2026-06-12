'use client';

import type { Snippet } from "@/generated/prisma/browser";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as action from "@/actions";

interface SnippetEditFormProps {
    snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code);
    
    const handleEditorChange = (value: string = "") => {
        setCode(value);
    }

    const  editSnippetAction = action.editSnippet.bind(null, snippet.id, code);
    return (
        <div>
            <h2>Edit Snippet</h2>
            <Editor
                height="40vh"
                theme="vs-dark"
                language="typescript"
                defaultValue={snippet.code}
                options={{ minimap: { enabled: false } }}
                onChange={handleEditorChange}
            />
            <form action={editSnippetAction}>
                <button type="submit" className="border p-2 rounded mt-4 bg-gray-100 hover:bg-gray-200">
                    Save
                </button>
            </form>
        </div>
    );
}