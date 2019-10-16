import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "../components/User";
import Signout from "../components/Signout";

const Nav = () => {
  return (
    <User>
      {({ data }) => {
        const me = data ? data.me : null;
        return (
          <NavStyles>
            <Link href="/items">
              <a>Items</a>
            </Link>
            {me && (
              <>
                <Link href="/sell">
                  <a>Sell</a>
                </Link>
                <Link href="/orders">
                  <a>Orders</a>
                </Link>
                <Link href="/me">
                  <a>Me</a>
                </Link>
                <Signout />
              </>
            )}
            {!me && (
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            )}
          </NavStyles>
        );
      }}
    </User>
  );
};

export default Nav;
