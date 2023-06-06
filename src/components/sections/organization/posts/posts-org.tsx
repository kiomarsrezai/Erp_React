import FixedOrg from "components/data/org/fixed-org";
import OrganizationPostsOrgCard from "./posts-org-card";
import { GetSingleOrgPostItemShape } from "types/orginization/posts-org-type";

interface OrganizationPostsProps {
  data: GetSingleOrgPostItemShape[];
  area: number;
  onBack: () => void;
}

function OrganizationPosts(props: OrganizationPostsProps) {
  const { data, area, onBack } = props;

  const orgRender = (item: any, otherProps: any) => (
    <OrganizationPostsOrgCard
      {...otherProps}
      title={item.departmentName}
      area={area}
      id={item.id}
      parentId={item.motherId || 0}
      item={item}
    />
  );

  return <FixedOrg data={data} render={orgRender} onBack={onBack} />;
}

export default OrganizationPosts;
