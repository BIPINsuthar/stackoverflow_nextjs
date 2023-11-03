import { Icons } from "@/components/atoms";
import { FilterType, GlobalSearchResult } from "@/types/shared";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import * as Actions from "../../../lib/actions";

export const GlobalResult = () => {
  const searchParams = useSearchParams();
  const global = searchParams.get("global");
  const type = searchParams.get("type") as FilterType;

  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      setResults([]);
      setIsLoading(false);

      try {
        // EVERYTHING EVERYWHERE ALL AT ONCE ....
        const result = await Actions.globalSearch({
          global: global,
          type: type,
        });

        setResults(result);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    return "/";
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <p className="body-semibold text-dark200_light800 line-clamp-1">
        Top Match
      </p>
      <div className="px-6 flex flex-col gap-4 h-full">
        {results.length != 0 ? (
          results.map((item, index) => {
            return (
              <Link
                // onClick={() => setOpen(false)}
                key={item.type + item.id}
                className="flex items-start gap-3 cursor-pointer"
                href={renderLink("", "")}
              >
                <Icons type="tag" className="reverse-colors mt-1" />
                <div className="flex flex-col gap-1">
                  <p className="body-semibold text-dark200_light800 line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-light-500 small-semibold">{item.type}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-dark200_light800 body-regular">
              Opps,no results found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
