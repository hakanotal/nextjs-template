import { Container, Title } from "@mantine/core";
import { type NextPage } from "next";
import FooterComponent from "../components/common/Footer";
import NavbarComponent from "../components/common/NavbarComponent";
import Profile from "../components/profile/Profile";

const Home: NextPage = () => {
  return (
    <>
      <NavbarComponent
        links={[
          { title: "Home", href: "/", active: true },
          { title: "Login", href: "/auth/login", active: false },
          { title: "Sign Up", href: "/auth/signup", active: false },
        ]}
      />
      <Container className="flex flex-col items-center justify-center py-16">
        <Title
          size={48}
          className="bg-gradient-to-r from-blue-400 to-pink-600 bg-clip-text font-extrabold text-transparent"
        >
          Welcome!
        </Title>
        <Profile />
      </Container>
      <FooterComponent />
    </>
  );
};

export default Home;
