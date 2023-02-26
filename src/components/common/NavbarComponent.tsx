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
  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  burgerHidden: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderMiddleProps {
  links: { title: string; href: string; active: boolean }[];
}

export default function NavbarComponent({ links }: HeaderMiddleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const buttons = links.map((link) => (
    <Link
      key={link.title}
      href={link.href}
      className={cx(classes.link, {
        [classes.linkActive]: link.active,
      })}
    >
      {link.title}
    </Link>
  ));

  return (
    <>
      <Header height={64} mb={120}>
        <Container className="flex h-full items-center justify-between max-sm:justify-start">
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            className={classes.burger}
          />
          <Group className={classes.burgerHidden} spacing={5}>
            {buttons}
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
