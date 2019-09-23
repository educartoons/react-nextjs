import Link from "next/link";

const Nav = () => {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/sell">Sell</Link>
    </div>
  );
};

export default Nav;
