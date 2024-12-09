import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useField } from "formik";

interface PostJobDescriptionProps {
  name: string;
  initialValue?: string; // New prop for initial content
}

const PostJobDescription: React.FC<PostJobDescriptionProps> = ({
  name,
  initialValue = "",
}) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const [, , helpers] = useField(name);
  const { setValue } = helpers;

  useEffect(() => {
    const quillElement = quillRef.current as HTMLDivElement & {
      __quill?: Quill;
    };

    if (quillElement && !quillElement.__quill) {
      const quill = new Quill(quillElement, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["link", "blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          },
        },
      });

      quillElement.__quill = quill;

      // Set the initial content
      if (initialValue) {
        quill.clipboard.dangerouslyPasteHTML(initialValue);
      }

      // Update Formik field value on text change
      quill.on("text-change", () => {
        const content = quill.root.innerHTML;
        setValue(content);
      });
    }
  }, [name, setValue, initialValue]);

  return <div ref={quillRef} style={{ height: "200px" }} />;
};

export default PostJobDescription;
