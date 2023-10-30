"use client";

import { Button } from "@/components/molecules";
import { Input } from "@/components/molecules/Input";

import * as Actions from "../../../lib/actions";
import * as Yup from "yup";

import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useFormik } from "formik";

import { Props } from "./types";

export const EditProfileForm = ({
  fullName,
  userName,
  portfolioLink,
  location,
  bio,
}: Props) => {
  const { userId } = useAuth();
  const path = usePathname();

  const formik = useFormik({
    initialValues: {
      fullName: fullName,
      userName: userName,
      portfolioLink: portfolioLink,
      location: location,
      bio: bio,
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string(),
      userName: Yup.string(),
      portfolioLink: Yup.string(),
      location: Yup.string(),
      bio: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        await Actions.updateUser({
          clerkId: userId!,
          path: path,
          updateData: {
            name: values.fullName,
            username: values.userName,
            portfolioWebsite: values.portfolioLink,
            location: values.location,
            bio: values.bio,
          },
        });
      } catch (error) {
        console.log("while updating user", error);
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Full Name"
        value={formik.values.fullName}
        onChange={(e) =>
          formik.setFieldValue("fullName", e.target.value, false)
        }
      />
      <Input
        label="Username"
        value={formik.values.userName}
        onChange={(e) =>
          formik.setFieldValue("userName", e.target.value, false)
        }
      />
      <Input
        label="Portfolio link"
        value={formik.values.portfolioLink}
        onChange={(e) =>
          formik.setFieldValue("portfolioLink", e.target.value, false)
        }
      />
      <Input
        label="Localtion"
        value={formik.values.location}
        onChange={(e) =>
          formik.setFieldValue("location", e.target.value, false)
        }
      />
      <Input
        label="Bio"
        type="textarea"
        value={formik.values.bio}
        onChange={(e) => formik.setFieldValue("bio", e.target.value, false)}
      />
      <Button
        onClick={formik.handleSubmit}
        isDisabled={formik.isSubmitting}
        title="Submit"
        type="gradient"
        width="fit"
      />
    </div>
  );
};
