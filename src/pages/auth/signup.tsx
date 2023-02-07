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
import {useRouter} from "next/router";
import { signup } from "../../lib/api/auth";

const SignupPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      setLoading(true);

      const response = await signup(email, password);

      if (response.status === 200) {
        router.push("/auth/signin");
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
    <Center style={{ height: "100vh" }}>
      <Container size={420} my={40}>
        <Title
          className="text-center font-extrabold"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          })}
        >
          Create New Account
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?
          <Link href="/auth/signin">
            <Button variant="subtle" compact>
              Login
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
              label="I accepted the Terms & Conditions"
              sx={{ lineHeight: 1 }}
              onChange={(e) => setTerms(e.currentTarget.checked)}
            />
          </Group>
          <Button
            disabled={!terms}
            fullWidth
            variant="outline"
            size="md"
            mt="xl"
            onClick={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            Sign Up
          </Button>
        </Paper>
      </Container>
    </Center>
  );
};

export default SignupPage;
