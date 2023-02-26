import { Paper, Text, Button } from "@mantine/core";
import { IconDiscountCheck } from "@tabler/icons";
import Link from "next/link";

export default function SuccessForm() {
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
      <Link href="/auth/login">
        <Button variant="subtle" size="lg" compact>
          Login
        </Button>
      </Link>
    </Paper>
  );
}
