import { useState, useEffect } from "react";
import { useMember } from "@memberstack/react";
import { posts } from "@/app/fakePosts";
import withLayout from "@/app/layouts/withLayout";

const Dashboard = () => {
  const { member, updateCustomFields } = useMember();

  useEffect(() => {
    member && console.log(member.customFields["articles_left"] - 3);
  }, [member]);

  return <div className="relative h-full mx-auto">hi</div>;
};

export default withLayout(Dashboard, "dashboard");
