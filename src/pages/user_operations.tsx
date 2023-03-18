import Layout from "@/components/globals/Layout";
import UserOperations from "@/views/user_operations/UserOperations";
import React, {ReactElement} from "react";

function user_operations() {
  return (
    <div>
      <UserOperations />
    </div>
  );
}

export default user_operations;

user_operations.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
