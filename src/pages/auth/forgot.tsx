import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  LoadingOverlay,
  Center,
  Stepper,
  NumberInput,
  PasswordInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconArrowLeft, IconDiscountCheck, IconX } from "@tabler/icons";
import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { z, ZodError } from "zod";

const EmailForm = (props: any) => {
  const [email, setEmail] = useState("");

  return (
    <Paper
      withBorder
      shadow="md"
      p={40}
      mt={30}
      radius="md"
      className="relative"
    >
      <TextInput
        label="Email"
        placeholder="user@mail.com"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Group position="apart" mt="lg">
        <Link href="/auth/signin">
          <Text
            color="dimmed"
            size="sm"
            className="align-center mt-5 flex items-center"
          >
            <IconArrowLeft size={12} stroke={1.5} className="mr-1" />
            Back to Login
          </Text>
        </Link>

        <Button
          variant="outline"
          size="md"
          mt="lg"
          onClick={(e) => {
            e.preventDefault();
            props.sendMail(email);
          }}
        >
          Send Mail
        </Button>
      </Group>
    </Paper>
  );
};

const CodeForm = (props: any) => {
  const [code, setCode] = useState(0);

  return (
    <Paper
      withBorder
      shadow="md"
      p={40}
      mt={30}
      radius="md"
      className="relative"
    >
      <NumberInput
        label="Verification Code"
        placeholder="123456"
        min={0}
        minLength={6}
        maxLength={6}
        onChange={(e: number) => setCode(e)}
        required
        hideControls
      />
      <Group mt="lg" className="justify-center">
        <Button
          variant="outline"
          size="md"
          mt="lg"
          onClick={(e) => {
            e.preventDefault();
            props.verifyCode(code);
          }}
        >
          Verify
        </Button>
      </Group>
    </Paper>
  );
};

const PasswordForm = (props: any) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <Paper
      withBorder
      shadow="md"
      p={40}
      mt={30}
      radius="md"
      className="relative"
    >
      <PasswordInput
        label="New Password"
        placeholder="******"
        onChange={(e) => setPassword(e.target.value)}
        required
        mt="md"
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="******"
        onChange={(e) => setPassword2(e.target.value)}
        required
        mt="md"
      />
      <Group mt="lg" className="justify-center">
        <Button
          variant="outline"
          size="md"
          mt="lg"
          onClick={(e) => {
            e.preventDefault();
            props.resetPassword(password, password2);
          }}
        >
          Reset Password
        </Button>
      </Group>
    </Paper>
  );
};

const SuccessForm = () => {
  return (
    <Paper
      withBorder
      shadow="md"
      p={40}
      mt={30}
      radius="md"
      className="relative text-center"
    >
      <IconDiscountCheck
        size={40}
        stroke={2}
        color="lightgreen"
        className="m-auto"
      />
      <Text size="lg" className="my-4">
        Your password has been reset successfully.
      </Text>
      <Link href="/auth/signin">
        <Button variant="subtle" size="lg" compact>
          Login
        </Button>
      </Link>
    </Paper>
  );
};

const ForgotPage: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState(0);
  const nextStep = () => setActive(Math.min(active + 1, 3));
  const stepClick = (i: number) => setActive(Math.min(active, i));

  const [emailVal, setEmailVal] = useState("");
  const [codeVal, setCodeVal] = useState(0);
  const [passwordVal, setPasswordVal] = useState("");

  const sendMail = async (email: string) => {
    try {
      setLoading(true);
      const sch = z.string().email();
      const control = sch.safeParse(email);
      console.log(control);
      if (!control.success) throw control.error;

      setEmailVal(email);
      console.log("Sending mail: ", email);
      nextStep();
    } catch (error: any) {
      if (error instanceof ZodError) {
        error.issues.forEach((e) => {
          showNotification({
            icon: <IconX size={18} />,
            color: "red",
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

  const verifyCode = async (code: number) => {
    try {
      setLoading(true);
      const sch = z.string().length(6);
      const control = sch.safeParse(code.toString());
      console.log(control);
      if (!control.success) throw control.error;

      setCodeVal(code);
      console.log("Verifying code: ", code, emailVal);
      nextStep();
    } catch (error: any) {
      if (error instanceof ZodError) {
        error.issues.forEach((e) => {
          showNotification({
            icon: <IconX size={18} />,
            color: "red",
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

  const resetPassword = async (pw: string, pw2: string) => {
    try {
      setLoading(true);

      const sch = z
        .string()
        .min(6)
        .refine((v) => v === pw2);
      const control = sch.safeParse(pw);
      console.log(control);
      if (!control.success) throw control.error;

      setPasswordVal(pw);
      console.log("Resetting password: ", passwordVal, codeVal, emailVal);
      nextStep();
    } catch (error: any) {
      if (error instanceof ZodError) {
        error.issues.forEach((e) => {
          showNotification({
            icon: <IconX size={18} />,
            color: "red",
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
    <Center style={{ height: "100vh" }} className="flex flex-col">
      <Container size={420} my={40}>
        <Title
          className="text-center font-extrabold"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          })}
        >
          Forgot Your Password?
        </Title>

        <LoadingOverlay visible={loading} overlayBlur={2} />

        {active == 0 && <EmailForm sendMail={sendMail} />}
        {active == 1 && <CodeForm verifyCode={verifyCode} />}
        {active == 2 && <PasswordForm resetPassword={resetPassword} />}
        {active == 3 && <SuccessForm />}
      </Container>

      <Container className="mt-20 text-center">
        <Stepper
          active={active}
          onStepClick={stepClick}
          breakpoint="sm"
          className="md:min-w-[768px]"
        >
          <Stepper.Step label="First Step" description="Enter your email" />
          <Stepper.Step label="Second Step" description="Verify the code" />
          <Stepper.Step label="Final Step" description="Reset your password" />
        </Stepper>
      </Container>
    </Center>
  );
};

export default ForgotPage;
