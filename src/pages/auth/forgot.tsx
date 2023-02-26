import {
  Title,
  Container,
  LoadingOverlay,
  Center,
  Stepper,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { type NextPage } from "next";
import { useState } from "react";
import { z, ZodError } from "zod";
import CodeForm from "../../components/auth/CodeForm";
import EmailForm from "../../components/auth/EmailForm";
import PasswordForm from "../../components/auth/PasswordForm";
import SuccessForm from "../../components/auth/SuccessForm";
import FooterComponent from "../../components/common/Footer";
import NavbarComponent from "../../components/common/NavbarComponent";

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
    <>
      <NavbarComponent
        links={[
          { title: "Home", href: "/", active: false },
          { title: "Login", href: "/auth/login", active: false },
          { title: "Sign Up", href: "/auth/signup", active: false },
        ]}
      />
      <Center className="flex flex-col" mb={100}>
        <Container className="w-1/3 max-md:w-full" my={40}>
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
            <Stepper.Step
              label="Final Step"
              description="Reset your password"
            />
          </Stepper>
        </Container>
      </Center>
      <FooterComponent />
    </>
  );
};

export default ForgotPage;
