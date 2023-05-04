import FixedOrg from "components/data/org/fixed-org";
import OrganizationPostsOrgCard from "./org-card";
import { GetSingleOrgPostItemShape } from "types/orginization/posts-org-type";

interface OrganizationPostsProps {
  data: GetSingleOrgPostItemShape[];
  area: number;
}

function OrganizationPosts(props: OrganizationPostsProps) {
  const { data, area } = props;

  const orgRender = (item: any, otherProps: any) => (
    <OrganizationPostsOrgCard
      {...otherProps}
      title={item.orgName}
      area={area}
      id={item.id}
      parentId={item.motherId || 0}
      item={item}
    />
  );

  return <FixedOrg data={data} render={orgRender} />;
}

export default OrganizationPosts;
