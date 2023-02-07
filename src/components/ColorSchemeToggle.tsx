import {
  Switch,
  Group,
  useMantineColorScheme,
  useMantineTheme,
  SegmentedControl,
  Center,
  Box,
} from "@mantine/core";
import { IconSun, IconMoonStars, IconMoon } from "@tabler/icons";

export function ColorSchemeToggle(props: { wide?: boolean }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Group position="center" my={30}>
      {props.wide ? (
        <SegmentedControl
          value={colorScheme}
          onChange={(value: "light" | "dark") => toggleColorScheme(value)}
          data={[
            {
              value: "light",
              label: (
                <Center>
                  <IconSun size={16} stroke={1.5} />
                  <Box ml={10}>Light</Box>
                </Center>
              ),
            },
            {
              value: "dark",
              label: (
                <Center>
                  <IconMoon size={16} stroke={1.5} />
                  <Box ml={10}>Dark</Box>
                </Center>
              ),
            },
          ]}
        />
      ) : (
        <Switch
          checked={colorScheme === "light"}
          onChange={() => toggleColorScheme()}
          size="lg"
          onLabel={<IconSun color={theme.white} size={20} stroke={2} />}
          offLabel={
            <IconMoonStars color={theme.colors.gray[6]} size={20} stroke={2} />
          }
        />
      )}
    </Group>
  );
}

export default ColorSchemeToggle;