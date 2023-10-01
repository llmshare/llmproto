import CodeGen from "@/components/CodeGen";

function Menubar() {
  return (
    <nav className="bg-black text-white p-5 text-xl flex justify-between items-center">
      <ul>
        <li>
          <h1>LLMShare</h1>
        </li>
      </ul>
      <ul>
        <li>
          <CodeGen />
        </li>
      </ul>
    </nav>
  );
}

export default Menubar;
