import Layout from "@/components/globals/Layout";
import Home from "@/views/home/Home";
import React, {ReactElement} from "react";

function index() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default index;

index.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
