import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

export default function OnlineDebugger() {
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
      <Card className="w-full max-w-5xl mx-auto">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-center mb-4">online debugger by Joonhee</h2>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-2">language</label>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
              </Select>
              <label className="block mt-4 mb-2">input code</label>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-40 font-mono text-sm border rounded p-2"
              />
              <Button onClick={executeCode} className="mt-4 w-full bg-pink-500 hover:bg-pink-700 text-white py-2 rounded">
                run
              </Button>
            </div>
            <div className="w-1/2">
              <label className="block mb-2">output</label>
              <pre className="w-full h-40 bg-black text-white p-4 rounded overflow-auto text-sm">
                {output || "출력 결과 없음"}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @font-face {
          font-family: 'HakgyoansimNadeuriTTF-B';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimNadeuriTTF-B.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
        }
        body {
          font-family: 'HakgyoansimNadeuriTTF-B', Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(120deg, #ff9a9e, #fad0c4);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .app-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
