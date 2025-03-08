const { useState } = React;

function OnlineDebugger() {
  const [code, setCode] = useState("console.log('Hello, World!');");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");

  const executeCode = async () => {
    try {
      let response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          version: "latest",
          files: [{ content: code }],
        }),
      });
      let result = await response.json();
      setOutput(result.run.output || "");
    } catch (error) {
      setOutput(error.toString());
    }
  };

  return (
    <div className="app-container">
      <h2 className="title">online debugger by Joonhee</h2>
      <div className="debugger-container">
        <div className="editor-container">
          <label>language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>

          <label>input code</label>
          <textarea value={code} onChange={(e) => setCode(e.target.value)}></textarea>

          <button onClick={executeCode}>run</button>
        </div>

        <div className="output-container">
          <label>output</label>
          <pre>{output || "출력 결과 없음"}</pre>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<OnlineDebugger />);
