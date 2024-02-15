import React, { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import useEditorKeys from './hooks/useEditorKeys';
import useStore from '../../store';
import { $getRoot } from "lexical";

export default function TraceUserPlugin() {
  const [editor] = useLexicalComposerContext();
  const check = useStore((state) => state.possible);
  const y = useStore((state) => state.keys);
  useEffect(() => {
    const keys = y;
    if (check) {
      const onMouseClick = (key) => {
        console.log(key);
      };
      const onMouseOver = (key) => {
        console.log(key);
      };

      const addListeners = () => {
        keys.forEach((key) => {
          const htmlElement = editor.getElementByKey(key);
          htmlElement.id = key;
          htmlElement.addEventListener("click", () => onMouseClick(htmlElement.id));
          htmlElement.addEventListener("mouseover", () => onMouseOver(htmlElement.id));

        });
      };

      addListeners();

      const removeListeners = () => {
        keys.forEach((key) => {
          const htmlElement = editor.getElementByKey(key);
          htmlElement.removeEventListener("click", () => onMouseClick(htmlElement.id));
          htmlElement.removeEventListener("mouseover", () => onMouseOver(htmlElement.id));
        });
      };

      return () => {
        removeListeners();
      };
    }
  }, [y]);

  return null;
}






