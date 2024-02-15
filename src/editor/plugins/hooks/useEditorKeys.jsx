import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';

export default function useEditorKeys(){
   const [editor] = useLexicalComposerContext();

   const getEditorKeys = useCallback(() => {
      return editor.getEditorState().read(() => $getRoot().getChildrenKeys());
   }, [editor]);

   const [keys, setKeys] = useState(getEditorKeys());

   useEffect(() => {
      return editor.registerUpdateListener(() => {
         setKeys(getEditorKeys());
      });
   }, [editor, getEditorKeys]);

   return { keys };
};