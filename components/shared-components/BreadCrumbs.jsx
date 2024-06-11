import React from "react";
import Link from "next/link";
const BreadCrumbs = ({ breadCrumbs }) => {
  return (
    <section className="py-5 sm:py-7 bg-lime-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
          {breadCrumbs.map((bc, index) => (
            <li key={index} className="inline-flex items-center">
              <Link href={bc.url} className="text-gray-600 hover:text-lime-600">
                {bc.name} /
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;
