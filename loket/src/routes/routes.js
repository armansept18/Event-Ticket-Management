import { Homepage } from "../pages/homepage";
import { SimpleCard } from "../pages/login";
import Register from "../pages/register";
import { ProtectedPage } from "./protectedPage";

class RoutesClass {
  constructor(path, element) {
    this.path = path;
    this.element = element;
  }
}

export const routes = [
    new RoutesClass ("home", (
    <ProtectedPage>
    <Homepage />
    </ProtectedPage>
    )
    ),
    new RoutesClass (
        "login",
        (
            <ProtectedPage guestOnly={true}>
                <SimpleCard />
            </ProtectedPage>
        )
    ),
    new RoutesClass (
        "register",
        (
            <ProtectedPage guestOnly={true}>
                <Register/>
            </ProtectedPage>
        )
    ),
];

