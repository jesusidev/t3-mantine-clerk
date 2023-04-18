import { ActionIcon, Anchor, Badge, Group, ScrollArea, Table, Text, useMantineTheme } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { type Product } from '~/types/product';
import Link from 'next/link';

interface UsersTableProps {
  data: Product[];
}

export function TableSelection({ data }: UsersTableProps) {
  const theme = useMantineTheme();
  const rows = data?.map((item) => (
    <tr key={item.name}>
      <td width={'20%'}>
        <Group spacing='sm'>
          {/*<Avatar size={30} src={item.avatar} radius={30} />*/}
          <Text fz='sm' fw={500} component={Link} href={`/products/${item.id}`}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td width={'20%'}>
        {item.categories.map(({ category }) => (
          <Badge mr={4} key={category.id} color='teal' variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
            {category.name}
          </Badge>
        ))}
      </td>
      <td>
        <Anchor component='button' size='sm'>
          {item.sku}
        </Anchor>
      </td>
      <td>
        <Text fz='sm' c='dimmed'>
          {item.isFavorite && item.isFavorite.toString()}
        </Text>
      </td>
      <td width={'8%'}>
        <Group spacing={0} position='right'>
          <ActionIcon>
            <IconPencil size='1rem' stroke={1.5} />
          </ActionIcon>
          <ActionIcon color='red'>
            <IconTrash size='1rem' stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} mt={15} verticalSpacing='sm' striped highlightOnHover withBorder withColumnBorders>
        <thead>
        <tr>
          <th>Product</th>
          <th>Categories</th>
          <th>SKU</th>
          <th>Favorite</th>
          <th />
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
