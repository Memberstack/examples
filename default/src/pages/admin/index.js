import { useState, useEffect, useCallback } from "react";
import Router, { useRouter } from "next/router";
import withLayout from "@/app/layouts/withLayout";

// Router.events.on("routeChangeComplete", (url) => {
//   window?.analytics?.page(url);
//   window.analytics.track("Page View", {
//     user_id: "123",
//   });
// });

const AdminDemo = ({ accessLevel, requiredPlans }) => {
  return (
    <div className="relative h-full mx-auto">
      <p className="text-white">admin - {accessLevel}</p>
      <br />
      <article className="prose md:prose-lg lg:prose-xl prose-slate dark:prose-invert">
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </p>
        <p>
          But a recent study shows that the celebrated appetizer may be linked
          to a series of rabies cases springing up around the country.
        </p>
      </article>
      <h2>{requiredPlans?.join(", ")}</h2>
    </div>
  );
};

export default withLayout(AdminDemo, "basic");
