const { useState } = React;

function OnlineDebugger() {
  const [code, setCode] = useState("console.log('Hello, World!');");
  const [output, setOutput] = useState("");

  const executeCode = () => {
    try {
      const consoleLog = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        consoleLog.push(args.join(" "));
      };

      eval(code);
      setOutput(consoleLog.join("\n"));
      console.log = originalConsoleLog;
    } catch (error) {
      setOutput(error.toString());
    }
  };

  return (
    <div className="app-container">
      <div className="editor-container">
        <h2>input code</h2>
        <textarea value={code} onChange={(e) => setCode(e.target.value)}></textarea>
        <button onClick={executeCode}>run</button>
      </div>
      <div className="output-container">
        <h2>output</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<OnlineDebugger />);
