import { useState } from "react";

const Menu = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className="z-50 fixed z top-8 right-8 p-3 bg-sky-300 w-11 h-11 rounded-md"
      >
        <div
          className={`bg-slate-50 h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45  translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-slate-50 h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-slate-50 h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`z-40 fixed top-0 right-0 bottom-0 bg-slate-800 transition-all overflow-hidden flex flex-col
      ${menuOpened ? "w-80" : "w-0"}`}
      >
        <div className="flex-1 flex items-start mt-20 flex-col gap-6 p-8">
          <div className="w-full h-full">

          </div>
        </div>
      </div>
    </>
  )

}

export default Menu;
