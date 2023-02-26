import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  LoadingOverlay,
  Center,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { ZodError } from "zod";
import { useRouter } from "next/router";
import { login } from "../../lib/api/auth";
import { setCookie } from "cookies-next";
import FooterComponent from "../../components/common/Footer";
import NavbarComponent from "../../components/common/NavbarComponent";

const LoginPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await login(email, password);

      if (response.status === 200) {
        // TODO Save token to local storage
        const token = response.data.token;
        setCookie("token", JSON.stringify(token), {
          maxAge: remember ? 2592000 : 86400,
          path: "/",
        });

        if (token.role === "admin") router.push("/panel-admin");
        else router.push("/panel-user");
      }
    } catch (error: any) {
      if (error instanceof ZodError) {
        error.issues.forEach((e) => {
          showNotification({
            icon: <IconX size={18} />,
            color: "red",
            title: (e.path[0] as string).toUpperCase(),
            message: e.message,
          });
        });
      } else {
        showNotification({
          icon: <IconX size={18} />,
          color: "red",
          title: error?.error_description,
          message: error?.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent
        links={[
          { title: "Home", href: "/", active: false },
          { title: "Login", href: "/auth/login", active: true },
          { title: "Sign Up", href: "/auth/signup", active: false },
        ]}
      />
      <Center mb={100}>
        <Container className="w-1/3 max-md:w-full">
          <Title
            className="text-center font-extrabold"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            })}
          >
            Welcome Back!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Don&apos;t you have an account?
            <Link href="/auth/signup">
              <Button variant="subtle" compact>
                Sign Up
              </Button>
            </Link>
          </Text>

          <Paper
            withBorder
            shadow="md"
            p={40}
            mt={30}
            radius="md"
            style={{ position: "relative" }}
          >
            <LoadingOverlay visible={loading} overlayBlur={2} />

            <TextInput
              label="Email"
              placeholder="user@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              required
              mt="md"
            />
            <Group position="apart" mt="lg">
              <Checkbox
                label="Remember Me"
                sx={{ lineHeight: 1 }}
                checked={remember}
                onChange={(event) => setRemember(event.currentTarget.checked)}
              />
              <Link href="/auth/forgot">
                <Button variant="subtle" compact>
                  Forgot password?
                </Button>
              </Link>
            </Group>
            <Button
              fullWidth
              variant="filled"
              size="md"
              mt="xl"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Login
            </Button>
          </Paper>
        </Container>
      </Center>
      <FooterComponent />
    </>
  );
};

export default LoginPage;
