import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";
import { useState } from "react";
import useStore from '../store';
async function htmlToNode (editor, check){

    editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString('<p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">SubmitButton.jsx:11</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p>', 'text/html');

        // Once you have the DOM instance it's easy to generate LexicalNodes.
        const nodes = $generateNodesFromDOM(editor, dom);

        // Select the root
        $getRoot().select();

        // Insert them at a selection.
        $insertNodes(nodes);
        editor.setEditable(false);
        check();
    });

}
export default function SubmitButton() {
    const [editor] = useLexicalComposerContext();
    const [htmlString, setHtmlString] = useState(null);
    const {keys, setKeys} = useStore();
    const nodeToHtml = () => {
        editor.getEditorState().read(() => {
            console.log($generateHtmlFromNodes(editor, null));
            setHtmlString($generateHtmlFromNodes(editor, null));
        });
    }

    const check = useStore((state) => state.setPossible);
    const k = async () => {
        await htmlToNode(editor, check);
        console.log(editor.getEditorState().read(() => $getRoot().getChildrenKeys()));
        setKeys(editor.getEditorState().read(() => $getRoot().getChildrenKeys()));
        // setInsert(editor.getEditorState().read(() => $getRoot().getChildrenKeys()));
        
    }
    return (
        <>
        <button onClick={nodeToHtml}></button>
        <button onClick={k}></button>
        </>
    )
}










/*

*/