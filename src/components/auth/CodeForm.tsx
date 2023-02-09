import {
  Paper,
  Button,
  Group,
  NumberInput,
} from "@mantine/core";
import { useState } from "react";

export default function CodeForm(props: any) {
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
}
