import { Paper, Text, Button, TextInput, Group } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import Link from "next/link";
import { useState } from "react";

export default function EmailForm(props: any) {
  
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
        <Link href="/auth/login">
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
          variant="filled"
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
}
