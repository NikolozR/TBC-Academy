type childrenProps<P = unknown> = P & {
  children: React.ReactNode;
};
type paramsLang = {
  params: { locale: string };
};
type handleVoid = {
  handle: () => void;
};
type headerProps = {
  dic?: dictionary;
  locale: string;
};
type loginFormProps = {
  handleLogin: (email: string, password: string) => Promise<void>;
};
type registerFormProps = {
  handleRegister: (
    name: string,
    email: string,
    password: string,
    age: number
  ) => Promise<void>;
};
type searchProps = {
  handleSort: () => void;
  val: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
};
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
interface Blog {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}
type NavbarDict = {
  home: string;
  profile: string;
  blogs: string;
  contacts: string;
};
type dictionary = {
  navbar: NavbarDict;
};
type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;
type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
type CreateUser = {
  name: string;
  email: string;
  passwordHash: string;
  age: number;
  role: string;
};
type RegisterUser = {
  name: string;
  email: string;
  password: string;
  age: number;
};
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  age: number;
};
type LogInUser = {
  email: string;
  password: string;
};

type AdminFormUser = {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  age?: number;
  type: "add" | "edit";
  handleSubmit: (formData: FormData) => Promise<void>;
};
interface ModalContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type ProductQuantityMap = {
  [productid: number]: number;
};
interface CartItem {
  id: number;
  userid: number;
  productid: number;
  quantity: number;
  createdat: string;
}
