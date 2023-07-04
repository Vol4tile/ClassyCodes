import React from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { useState, useEffect } from "react";
export const CodeEditor = () => {
  var language = "xml";
  var displayName = "HTML";
  var value = "html";

  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <div>
          <Editor
            language="xml"
            height="45%"
            width="25vw"
            displayName="HTML"
            value={html}
            onChange={(e)=>{
             
                setHtml(e)
              
              
            }}
            className="hello"
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            height="52%"
            width="25vw"
          />
        </div>

        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="80%"
          height="100%"
          className="shower"
        />

        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
          height="98%"
          width="25vw"
        />
      </div>
    </>
  );
};
