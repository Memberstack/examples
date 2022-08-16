import { useState, useEffect } from "react";
import withLayout from "@/app/layouts/withLayout";

const AdminDemo = ({ name }) => {
  return (
    <div className="relative h-full mx-auto">
      <p className="text-white">admin {name}</p>
    </div>
  );
};

export default withLayout(AdminDemo, "basic");
