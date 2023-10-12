"use client";
import React from "react";
import { Button } from "@/components/molecules";
import { Tag } from "@/components/molecules/Badges";
import { Input } from "@/components/molecules/Input";
import { Editor } from "@tinymce/tinymce-react";

import { useFormik } from "formik";
import * as Yup from "yup";
import * as Actions from "../../../../lib/actions";
import { usePathname, useRouter } from "next/navigation";

interface AskQustionProps {
  questionTitle: string;
  problemExplanation: string;
  tags: string[];
  tag: string;
}

export const Question = () => {
  const router = useRouter();
  const pathName = usePathname();

  const formik = useFormik<AskQustionProps>({
    initialValues: {
      questionTitle: "",
      problemExplanation: "",
      tags: [],
      tag: "",
    },
    validationSchema: Yup.object().shape({
      questionTitle: Yup.string().required("title is required!"),
      problemExplanation: Yup.string().required(
        "problemExplanation is required!"
      ),
      tag: Yup.string().max(15, "tag must be less than 15 character"),
    }),
    onSubmit: async (values) => {
      try {
        await Actions.createQuestion({
          title: values.questionTitle,
          content: values.problemExplanation,
          auther: "65267af5f0c8b92da6d4bccb",
          tags: values.tags,
          path: pathName,
        });
        router.push("/");
      } catch (error) {
        console.log("error while creating question", error);
      }
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue != "") {
        if (tagValue.length > 15) {
          formik.setErrors({
            tag: "tag must be less than 15 character",
          });
        } else {
          formik.setErrors({});
          if (!formik.values.tags.includes(tagValue)) {
            const totalTags = [...formik.values.tags, tagValue];
            formik.setFieldValue("tags", totalTags, false);
          }
        }
      }
    }
  };

  const handleDeleteTag = (tagValue: string) => {
    const updatedTags = formik.values.tags.filter((tag) => tag != tagValue);
    formik.setFieldValue("tags", updatedTags, false);
  };

  return (
    <>
      <Input
        value={formik.values.questionTitle}
        onChange={(e) =>
          formik.setFieldValue("questionTitle", e.target.value, false)
        }
        label="Question Title"
        extraText="Be specific and imagine you’re asking a question to another person."
        error={formik.errors.questionTitle}
      />

      <div className="flex flex-col gap-4">
        <p className="paragraph-semibold text-dark400_light800">
          Detailed explanation of your problem? *
        </p>
        <Editor
          value={formik.values.problemExplanation}
          apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
          initialValue=""
          onChange={(value) => {
            formik.setFieldValue("problemExplanation", value, false);
          }}
          onEditorChange={(content) =>
            formik.setFieldValue("problemExplanation", content, false)
          }
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
          }}
        />
        {formik.errors.problemExplanation ? (
          <p className="text-red-600 small-regular">
            {formik.errors.problemExplanation}
          </p>
        ) : (
          <p className="text-light-500 body-regular">
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </p>
        )}
        <Input
          error={formik.errors.tag}
          onkeydown={handleKeyDown}
          label="Tags"
          extraText="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
        />
        <div className="flex flex-1 flex-wrap gap-2">
          {formik.values.tags.map((item) => {
            return (
              <Tag
                key={item}
                onDelete={() => handleDeleteTag(item)}
                label={item}
              />
            );
          })}
        </div>
      </div>
      <Button
        isDisabled={formik.isSubmitting}
        title={"Ask a Question"}
        onClick={formik.handleSubmit}
        type="gradient"
        width="fit"
      />
    </>
  );
};
