import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMember } from "@memberstack/react";
import withLayout from "@/app/layouts/withLayout";

const Video = () => {
  const { member, updateCustomFields } = useMember();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    member && console.log(member.customFields["articles_left"] - 3);
  }, [member]);

  return (
    <div className="relative h-full mx-auto">
      <p>Post: {id}</p>
    </div>
  );
};

export default withLayout(Video, "content");
