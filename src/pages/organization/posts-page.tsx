import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OrganizationPosts from "components/sections/organization/posts/posts-org";
import AreaInput from "components/sections/inputs/area-input";

import { useState } from "react";
import { orgPostsConfig } from "config/features/orginization/posts-config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orgPostsApi } from "api/organizition/posts-otg-api";
import BoxLoading from "components/ui/loading/box-loading";
import { reactQueryKeys } from "config/react-query-keys-config";

function PostsOrganzationPage() {
  const [formdata, setFormdata] = useState({
    [orgPostsConfig.area]: 0,
  });

  const orgPostsQuery = useQuery(
    reactQueryKeys.orginization.posts.getPosts,
    () => orgPostsApi.getPosts(0),
    {
      enabled: false,
    }
  );

  const queryClient = useQueryClient();

  const getPostsMutation = useMutation(orgPostsApi.getPosts, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        reactQueryKeys.orginization.posts.getPosts,
        data
      );
    },
  });

  const handleDoneClick = () => {
    getPostsMutation.mutate(formdata[orgPostsConfig.area]);
  };

  const renderSelectArea = () => {
    if (getPostsMutation.isLoading) {
      return <BoxLoading />;
    }

    return (
      <Box component="form" sx={{ width: 700, mx: "auto", p: 3 }}>
        <AreaInput value={formdata[orgPostsConfig.area]} setter={setFormdata} />
        <Button variant="contained" sx={{ mt: 1 }} onClick={handleDoneClick}>
          انتخاب
        </Button>
      </Box>
    );
  };

  return (
    <AdminLayout>
      {getPostsMutation.data && orgPostsQuery.data?.data ? (
        <OrganizationPosts
          data={orgPostsQuery.data.data}
          area={formdata[orgPostsConfig.area]}
        />
      ) : (
        <>{renderSelectArea()}</>
      )}
    </AdminLayout>
  );
}

export default PostsOrganzationPage;
