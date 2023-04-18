import {
  IconCircleCheckFilled,
  IconDots,
  IconEdit,
  IconHash,
  IconHeart,
  IconHeartFilled,
  IconShoppingBag,
  IconTags,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import { ActionIcon, Button, Card, Center, createStyles, Group, Image, Menu, rem, Text, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { api } from '~/utils/api';
import { notifications } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
  card: {
    maxWidth: '17em',
    position: 'relative',
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

type Category = {
  categoryId: string;
  productId: string;
  category: {
    id: string;
    name: string;
    status: string;
  }
}

interface ProductCardProps {
  id: string;
  image: string;
  link: string;
  title: string;
  description: string;
  isFavorite?: boolean;
  brand?: string;
  categories?: Category[];
  quantity?: number;
}

export function CardProduct({
                              id,
                              image,
                              link,
                              title,
                              description,
                              brand,
                              isFavorite = false,
                              categories,
                              quantity,
                              ...others
                            }: ProductCardProps) {
  const { classes, cx } = useStyles();
  const linkProps = { href: link };
  const trpc = api.useContext();

  const { mutate: updateProduct } = api.product.update.useMutation({
    onMutate: async (product) => {
      await trpc.product.getAll.cancel();
      const previousProducts = trpc.product.getAll.getData();

      trpc.product.getAll.setData(undefined,
        previousProducts?.filter((p) => {
          if (p.id === product.id) {
            return product;
          }
          return p;
        }),
        );

      return { previousProducts };
    },
    onSettled: async () => {
      await trpc.product.getAll.invalidate();
    },
    onSuccess: (product) => {
      notifications.show({
        id: product.id,
        title: 'Update Successful',
        message: `Product ${product.isFavorite ? 'added to' : 'removed from'} favorites`,
        color: 'green.5',
        icon: <IconCircleCheckFilled />,
      });
    },
    onError: (e, product) => {
      console.error(e);
      notifications.show({
        id: product.id,
        title: 'Unable to update',
        message: `${e.message}`,
        color: 'red.5',
        icon: <IconX />,
      });
    },
  });
  const onFavoriteClick = (id: string) => {
    updateProduct({ id, isFavorite: !isFavorite });
  };

  const { mutate: deleteProduct } = api.product.delete.useMutation({
    onMutate: async (product) => {
      await trpc.product.getAll.cancel();
      const previousProducts = trpc.product.getAll.getData();

      trpc.product.getAll.setData(undefined, (prev) => {
        if (!prev) return previousProducts;
        return prev.filter((p) => p.id !== product.id);
      });

      return { previousProducts };
    },
    onSettled: async () => {
      await trpc.product.getAll.invalidate();
    },
    onSuccess: (product) => {
      notifications.show({
        id: product.id,
        title: 'Deleted Successful',
        message: `Product ${product.name} has been deleted`,
        color: 'green.5',
        icon: <IconCircleCheckFilled />,
      });
    },
    onError: (e, product) => {
      console.error(e);
      notifications.show({
        id: product.id,
        title: 'Unable to delete',
        message: `${e.message}`,
        color: 'red.5',
        icon: <IconX />,
      });
    },
  });

  const onDeleteClick = (id: string) => {
    deleteProduct({ id });
  };

  return (
    <Card withBorder radius='md' className={cx(classes.card)} {...others}>
      <Card.Section withBorder inheritPadding py='xs'>
        <Group position='apart' noWrap>
          <Text fw='800' weight={500} component={Link} {...linkProps} truncate>{title}</Text>
          <Menu withinPortal position='bottom-end' shadow='sm' withArrow arrowPosition='center'>
            <Menu.Target>
              <ActionIcon>
                <IconDots size='1rem' />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconEdit size={rem(14)} />}>Edit</Menu.Item>
              <Menu.Item icon={<IconTrash size={rem(14)} />} color='red.5'
                         onClick={() => onDeleteClick(id)}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <Card.Section>
        <Text component={Link} {...linkProps}>
          <Image src={image} height={180} alt={`product for ${title}`} />
        </Text>
      </Card.Section>

      <Text fz='xs' my={5} lineClamp={4}>
        {description}
      </Text>


      <Card.Section className={classes.section} mt='md'>
        <Group spacing={8} mb={-8}>
          {quantity &&
            <Center>
              <Tooltip label='Quantity' withArrow position='top'>
                <IconHash size='1.05rem' className={classes.icon} stroke={1.5} />
              </Tooltip>
              <Text size='xs'>{quantity}</Text>
            </Center>
          }
          {brand &&
            <Center>
              <Tooltip label='Brand' withArrow position='top'>
                <IconShoppingBag size='1.05rem' className={classes.icon} stroke={1.5} />
              </Tooltip>
              <Text size='xs'>{brand}</Text>
            </Center>
          }
          {categories !== undefined &&
            <Center>
              <Tooltip label='Categories' withArrow position='top'>
                <IconTags size='1.05rem' className={classes.icon} stroke={1.5} />
              </Tooltip>
              <Text size='xs'>{categories[0]?.category.name}</Text>
            </Center>
          }
        </Group>
      </Card.Section>

      <Group mt='xs'>
        <Button radius='md' style={{ flex: 1 }} component={Link} {...linkProps}>
          Show details
        </Button>
        <ActionIcon variant='heart' radius='md' size={36} onClick={() => onFavoriteClick(id)}>
          {isFavorite ? <IconHeartFilled size='1.1rem' stroke={1.5} /> :
            <IconHeart size='1.1rem' stroke={1.5} />}
        </ActionIcon>
      </Group>
    </Card>
  );
}
