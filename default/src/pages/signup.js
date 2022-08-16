import { useState, useEffect } from "react";
import axios from "axios";
import withLayout from "@/app/layouts/withLayout";

const Signup = () => {
  const fetchSite = async () => {
    const res = await axios.get("/api/admin/test");
    console.log(res.data);
  };
  useEffect(() => {}, []);
  return (
    <div className="relative h-full mx-auto">
      signup <button onClick={() => fetchSite()}>signup</button>
    </div>
  );
};

export default withLayout(Signup, "basic");
