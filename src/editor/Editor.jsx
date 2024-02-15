import Theme from "./themes/Theme";
import { useRef, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import SubmitButton from "./SubmitButton";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import {TabIndentationPlugin} from "@lexical/react/LexicalTabIndentationPlugin.dev";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import DraggablePlugin from "./plugins/DraggablePlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import TraceUserPlugin from "./plugins/TraceUserPlugin";
function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}


function ChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

export default function Editor() {
  const parser = new DOMParser();
  const dom = parser.parseFromString('<p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">SubmitButton.jsx:11</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p><p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">null</span></p>', 'text/html');
  const [editorState, setEditorState] = useState();
  function handleEditorState(editorState) {
    setEditorState(editorState);
  }
  const editorConfig = {
    // The editor theme
    theme: Theme,
    editorState: null,
    // Handling of errors during update
    onError(error) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ]
  };

  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <TraceUserPlugin />
            <DraggablePlugin />
            <AutoLinkPlugin />
            <TabIndentationPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <ChangePlugin onChange={handleEditorState} />
          </div>
        </div>
        <SubmitButton></SubmitButton>
      </LexicalComposer>

    </>
  );
}
