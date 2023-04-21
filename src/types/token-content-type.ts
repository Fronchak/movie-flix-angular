import RoleType from "./role-type";

type TokenContentType = {
  exp: number,
  sub: string;
  roles: Array<RoleType>
}

export default TokenContentType;
