import Layout from "@/components/globals/Layout";
import Explorer from "@/views/explorer/Explorer";
import React, {ReactElement} from "react";

function explorer() {
  return (
    <div>
      <Explorer />
    </div>
  );
}

export default explorer;

explorer.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
