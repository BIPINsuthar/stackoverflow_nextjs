import React from "react";
import { TagCard } from "@/components/organisms";

import * as Actions from "../../../lib/actions";
import Link from "next/link";

const Tags = async () => {
  const tags = await Actions.getAllTags();

  return (
    <section className="flex flex-1 flex-col gap-6">
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <div className="flex items-center gap-2 flex-wrap">
        {tags.map((item) => {
          return (
            <Link href={`/tags/${item._id}`}>
              <TagCard
                key={item._id}
                name={item.name}
                totalQuestions={item.questions.length}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Tags;
