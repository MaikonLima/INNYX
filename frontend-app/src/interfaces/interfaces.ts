export type ICategory = {
  id: number | null;
  name: string;
  products: [];
};


export type JwtPayload = {
  sub: number;
  email: string;
  roles: string[];
  name: string;
  iat: number;
  exp: number;
}