import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

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
  const displayRef = useRef(null);
  return (
    <div className="dark:text-black">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          displayRef.current.innerHTML = content;
        }}
      >
        <div className="dark:bg-white text-black">
          <JoditEditor
            ref={editor}
            value={content}
            // config={config}
            tabIndex={8} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            // onChange={(newContent) => {
            //   setContent(newContent);
            // }}
            config={{
              autofocus: true,
              uploader: {
                insertImageAsBase64URI: true,
              },
              spellcheck: true,
              // inline: true,
              toolbarInlineForSelection: true,
              showPlaceholder: false,
            }}
          />
        </div>

        <button className="text-white bg-blue-500 px-2 py-1 my-4 rounded-md">
          Submit
        </button>
      </form>

      <div ref={displayRef}></div>
    </div>
  );
};

export default Test;
