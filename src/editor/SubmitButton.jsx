import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from "@lexical/html";
function SubmitButton() {
    const [editor] = useLexicalComposerContext();
    const nodeToHtml = () => {
        editor.getEditorState().read(() => {
            console.log($generateHtmlFromNodes(editor, null));
        });
    }
    return (
        <button onClick={nodeToHtml}></button>
    )
}
export default SubmitButton;










/*

*/