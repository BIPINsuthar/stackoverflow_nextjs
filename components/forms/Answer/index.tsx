"use client";
import { Icons } from "@/components/atoms";
import { Button } from "@/components/molecules";
import { useTheme } from "@/context";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { useRef } from "react";

import * as Actions from "../../../lib/actions";

import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Props } from "./types";

export const Answer = ({ questionId }: Props) => {
  const { userId: clerkId } = useAuth();
  const pathName = usePathname();

  const { mode } = useTheme();
  const editorRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      problemExplanation: "",
    },
    onSubmit: async () => {
      await Actions.createAnswer({
        content: formik.values.problemExplanation,
        questionId: questionId,
        clerkId: clerkId!,
        path: pathName,
      });

      formik.resetForm();
    },
  });

  return (
    <section className="flex flex-col gap-4">
      <div className="flex-between">
        <p className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </p>
        <div className="flex cursor-pointer background-light800_dark300 items-center gap-1 rounded-md light-border border px-4 py-3 w-fit">
          <Icons type="stars" size={12} />
          <p className="primary-text-gradient small-medium">
            Generate AI Answer
          </p>
        </div>
      </div>
      <Editor
        value={formik.values.problemExplanation}
        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
        initialValue={formik.values.problemExplanation}
        onBlur={formik.handleBlur}
        onChange={(value) => {
          formik.setFieldValue("problemExplanation", value, false);
        }}
        onEditorChange={(content) =>
          formik.setFieldValue("problemExplanation", content, false)
        }
        onInit={(evt, editor) => {
          // @ts-ignore
          editorRef.current = editor;
        }}
        init={{
          height: 350,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "codesample",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "codesample | bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | ",
          content_style: "body { font-family:Inter; font-size:16px }",
          skin: mode == "dark" ? "oxide-dark" : "oxide",
          content_css: mode == "dark" ? "dark" : "light",
        }}
      />
      <div className="w-full items-end flex flex-col">
        <Button
          isDisabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
          title="Post Answer"
          type="gradient"
          width="fit"
        />
      </div>
    </section>
  );
};
