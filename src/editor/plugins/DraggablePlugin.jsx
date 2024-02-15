import React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DraggableElement } from './components/DraggableElement';
import { OnDragLine } from './components/OnDragLine'
import useDragListeners from './hooks/useDragListenrs';
export default function DraggablePlugin() {
    const [editor] = useLexicalComposerContext();
    useDragListeners();
    const isEditable = editor.isEditable();

    if (!isEditable) {
        return null;
    }

    return (
        <>
            <DraggableElement />
            <OnDragLine />
        </>
    );
};