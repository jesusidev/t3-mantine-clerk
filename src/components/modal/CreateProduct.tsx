// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBoxSeam,
  IconBuildingStore,
  IconClipboardList,
  IconHeart,
  IconHeartFilled,
  IconListDetails,
  IconTags,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { InputText } from '~/components/input/InputText';
import { breakpoints } from '~/styles/breakpoints';
import { api } from '~/utils/api';
import { type ProductInput } from '~/types/product';
import { InputNumber } from '~/components/input/InputNumber';

export function ModalCreateProduct({ opened, close }: { opened: boolean; close: () => void; }) {
  const theme = useMantineTheme();
  const trpc = api.useContext();

  const form = useForm({
    initialValues: {
      product: {
        name: '',
        brand: '',
        sku: '',
        isFavorite: false,
      },
      remaining: {
        quantity: 0,
      },
    },
    validate: {
      product: {
        name: (value) => (value.length < 1 ? 'Product name must have a name' : null),
      },
      remaining: {
        quantity: (value) => (value < 0 ? 'Quantity must be greater than 0' : null),
      },
    },
  });

  const { mutate: createProduct } = api.product.create.useMutation({
    onMutate: async (product) => {
      await trpc.product.getAll.cancel();
      const previousProducts = trpc.product.getAll.getData();

      trpc.product.getAll.setData(undefined, (prev) => {
        if (!prev) return previousProducts;
        return prev.map((p) => {
          if (p.id === product.id) {
            return product;
          }
          return p;
        });
      });

      return { previousProducts };
    },
    onSettled: async () => {
      await trpc.product.getAll.invalidate();
    },
    onSuccess: () => {
      void close();
    },
  });

  function onSubmitForm(values: ProductInput) {
    const product = {
      name: values.product.name,
      brand: values.product.brand,
      sku: values.product.sku,
      isFavorite: values.product.isFavorite,
      quantity: values.remaining.quantity,
    } as ProductInput;
    createProduct(product);
  }

  return (
    <Modal
      size={'lg'}
      opened={opened}
      onClose={close}
      title='Create New Product'
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <Tabs defaultValue='product' variant='outline' radius='md'>
        <Tabs.List>
          <Tabs.Tab value='product' icon={<IconBoxSeam size='0.8rem' />}>Product</Tabs.Tab>
          <Tabs.Tab value='remaining' icon={<IconListDetails size='0.8rem' />}>Remaining</Tabs.Tab>
          <Tabs.Tab value='store' icon={<IconBuildingStore size='0.8rem' />}>Store</Tabs.Tab>
          <Tabs.Tab value='project' icon={<IconClipboardList size='0.8rem' />}>Project</Tabs.Tab>
          <Tabs.Tab value='categories' icon={<IconTags size='0.8rem' />}>Categories</Tabs.Tab>
        </Tabs.List>
        <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
          <Tabs.Panel value='product' pt='xs'>
            <SimpleGrid
              cols={1}
              spacing='sm'
              breakpoints={[
                { minWidth: breakpoints.tablet, cols: 2 },
              ]}
            >
              <InputText
                withAsterisk
                label='Product Name:'
                {...form.getInputProps('product.name')}
              />
              <InputText
                label='Brand Name:'
                {...form.getInputProps('product.brand')}
              />
            </SimpleGrid>
            <SimpleGrid
              cols={1}
              spacing='sm'
              breakpoints={[
                { minWidth: breakpoints.tablet, cols: 2 },
              ]}
            >
              <InputText
                label='SKU:'
                {...form.getInputProps('product.sku')}
              />
              <Stack spacing={0}>
                <Text>Favorite?</Text>
                <ActionIcon variant='heart' radius='md' size={36}
                            onClick={() => form.setValues({
                              ...form.values,
                              product: { ...form.values.product, isFavorite: !form.values.product.isFavorite },
                            })}>
                  {form.values.product.isFavorite ?
                    <IconHeartFilled size='1.1rem' stroke={1.5} /> :
                    <IconHeart size='1.1rem' stroke={1.5} />}
                </ActionIcon>
              </Stack>
            </SimpleGrid>

          </Tabs.Panel>

          <Tabs.Panel value='remaining' pt='xs'>
            <InputNumber
              label='Quantity:'
              {...form.getInputProps('remaining.quantity')}
            />
          </Tabs.Panel>

          <Tabs.Panel value='store' pt='xs'>
            store tab content
          </Tabs.Panel>

          <Tabs.Panel value='project' pt='xs'>
            project tab content
          </Tabs.Panel>

          <Tabs.Panel value='categories' pt='xs'>
            categories tab content
          </Tabs.Panel>
          <Divider my='sm' />
          <Group position='right'>
            <Button type='submit'>Submit</Button>
          </Group>
        </form>
      </Tabs>
    </Modal>
  );
}
