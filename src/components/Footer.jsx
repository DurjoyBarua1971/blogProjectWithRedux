import React from "react";

export default function Footer() {
  return (
    <div className="pt-20 px-4 font-fredoka font-medium">
      <h1 className="text-gray-800">
        Built with <span className="text-cyan-800">React.js</span>,{" "}
        <span className="text-cyan-800">TailwindCSS</span> and{" "}
        <span className="text-cyan-800">Redux ToolKit</span>, Coded with{" "}
        <span className="text-cyan-800">Visual Studio</span>, Designed in{" "}
        <span className="text-cyan-800">Miro </span>
        and Deployed with <span className="text-cyan-800">Vercel </span>. All
        text is set in the <span className="text-cyan-800">Inter </span> and{" "}
        <span className="text-cyan-800">Fredoka </span> typeface.
      </h1>
    </div>
  );
}
