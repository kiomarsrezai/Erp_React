interface SuccessLoginItemShape {
  name: string | number;
  token: string;
  userName: string;
  firstName: string;
  lastName: string;
  sectionId: string;
}

export type LoginItemShape = SuccessLoginItemShape | null;
