import ColorSchemeToggle from "./ColorSchemeToggle";
import {
  createStyles,
  Header,
  Group,
  Container,
  Burger,
  Button,
  ScrollArea,
  Drawer,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantine/ds";
import Link from "next/link";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 64,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  burgerHidden: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function NavbarComponent() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const links = [
    { title: "Login", href: "/auth/signin" },
    { title: "Sign Up", href: "/auth/signup" },
  ];

  return (
    <>
      <Header height={64} mb={120}>
        <Container className={classes.inner}>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            className={classes.burger}
          />
          <Group className={classes.burgerHidden} spacing={5}>
            {links.map((link) => (
              <Link key={link.title} href={link.href}>
                <Button variant="outline">{link.title}</Button>
              </Link>
            ))}
          </Group>

          <MantineLogo size={48} />
          {/* <Image src={"/banner.jpg"} alt="banner" height={64} width={128} /> */}

          <Group
            spacing={5}
            className={classes.burgerHidden}
            position="right"
            noWrap
          >
            <ColorSchemeToggle />
          </Group>
        </Container>
      </Header>

      <Drawer
        opened={opened}
        onClose={toggle}
        size="100%"
        padding="md"
        className={classes.burger}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Group className="flex flex-col text-center">
            {links.map((link) => (
              <Link key={link.title} href={link.href}>
                <Button variant="outline">{link.title}</Button>
              </Link>
            ))}
            <Divider />
            <ColorSchemeToggle />
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}
