interface SuccessLoginItemShape {
  name: string | number;
  token: string;
  userName: string;
  firstName: string;
  lastName: string;
  sectionId: string;
  bio: string;
  lisence: string | null;
}

export type LoginItemShape = SuccessLoginItemShape | null;
