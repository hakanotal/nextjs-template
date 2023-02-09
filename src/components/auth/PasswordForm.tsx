import { Paper, Button, Group, PasswordInput } from "@mantine/core";
import { useState } from "react";

export default function PasswordForm(props: any) {
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
}
