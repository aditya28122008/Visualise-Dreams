import JoditEditor from "jodit-react";
import { useMemo, useRef, useState } from "react";

const Test = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // const config = useMemo(
  // 	{
  // 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  // 		placeholder: placeholder || 'Start typings...'
  // 	},
  // 	[placeholder]
  // );
  return (
    <div className="dark:text-black">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(content);
        }}
      >
        <div className="no-tailwindcss">
          <JoditEditor
            ref={editor}
            value={content}
            // config={config}
            tabIndex={8} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>

        <button className="text-white bg-blue-500 px-2 py-1 my-4 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Test;
