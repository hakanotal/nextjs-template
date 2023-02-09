import { Container, Title } from "@mantine/core";
import { type NextPage } from "next";
import NavbarComponent from "../components/NavbarComponent";
import Profile from "../components/profile/Profile";

const Home: NextPage = () => {
  
  return (
    <>
      <NavbarComponent />
      <Container className="flex flex-col items-center justify-center">
        <Title
          size={48}
          className="bg-gradient-to-r from-blue-400 to-pink-600 bg-clip-text font-extrabold text-transparent"
        >
          Welcome!
        </Title>
        <Profile/>
      </Container>
    </>
  );
};

export default Home;
