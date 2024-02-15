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
    console.log("실행은 되냐?")
    const keys = y;
    console.log(check);
    console.log(keys);
    if (check) {
      const onMouseClick = (key) => {
        console.log(key);
      };

      const addListeners = () => {
        keys.forEach((key) => {
          const htmlElement = editor.getElementByKey(key);
          htmlElement.id = key;
          htmlElement.addEventListener("click", () => onMouseClick(htmlElement.id));
          console.log("헤이")
        });
      };

      addListeners();

      const removeListeners = () => {
        keys.forEach((key) => {
          const htmlElement = editor.getElementByKey(key);
          htmlElement.removeEventListener("click", () => onMouseClick(htmlElement.id));
        });
      };

      return () => {
        removeListeners();
      };
    }
  }, [y]);

  return null;
}










    // const [key, setKey] = useState(null);
    // console.log("나변경된다")
    
    // useEffect(() => {
    //     const addListeners = () => {
    //         keys.forEach((key) => {
    //             const htmlElement = editor.getElementByKey(key);
    //             htmlElement.addEventListener('click', onMouseClick(key));
                
    //         });
    //     }
    //     addListeners();
    //     const removeListeners = () => {
    //         keys.forEach((key) => {
    //             const htmlElement = editor.getElementByKey(key);
    //             htmlElement.removeEventListener('click', onMouseClick(key));
    //         });
    //     }
    //     return () => {
    //         removeListeners();
    //     }
    // }, [keys]);



    // useEffect(() => {
    //     const addListeners = () => {
    //         const currentKeys = getEditorKeys();
    //         currentKeys.forEach((currentKey) => {
    //             // Check if the key is already in the state to avoid duplicates
    //             if (!keys.some((k) => k.key === currentKey)) {
    //                 const htmlElement = editor.getElementByKey(currentKey);

    //                 if (!htmlElement) {
    //                     console.warn('[TraceUserPlugin] No html element');
    //                     return;
    //                 }
    //                 htmlElement.classList.add('draggable-block');
    //                 htmlElement.id = currentKey;
    //                 const onMouseClick = () => {
    //                     setKey((prevKey) => {
    //                         console.log(htmlElement.id);
    //                         return htmlElement.id;
    //                     });
    //                 };

    //                 htmlElement.addEventListener('click', onMouseClick);
    //                 setKeys((prevKeys) => [...prevKeys, { key: currentKey, onMouseClick }]);
    //             }
    //         });
    //     };

    //     const removeListeners = () => {
    //         keys.forEach(({ key: currentKey, onMouseClick}) => {
    //             const htmlElement = editor.getElementByKey(currentKey);
    //             htmlElement.removeEventListener('click', onMouseClick);
    //         });
    //     };

    //     addListeners();

    //     return () => {
    //         removeListeners();
    //     };
    // }, [getEditorKeys, editor]);


