import React, { useState, useEffect } from 'react';
import Editor from './Components/Editor'
import useLocalStorage from './Components/Hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '<H1>Hello World 🗺 </H1>')
  const [css, setCss] = useLocalStorage('css', `body { 
    color: black; 
    font-size: 24px; 
    font-weight: 800; 
  } `)
  const [js, setJs] = useLocalStorage('js', 'document.body.style.background = "orange"')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;