import { Logo } from "./logo";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-[50px] z-[49] bg-[#1f1f23] px-2 lg:px-4 flex justify-between items-center shadow-sm border-b border-border">
      <Logo />
      <Actions />
    </nav>
  );
};
