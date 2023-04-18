// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRouter } from 'next/router';
import LayoutDashboard from '~/layouts/dashboard';
import { api } from '~/utils/api';
import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Skeleton,
  Tabs,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import {
  IconArrowBack,
  IconArrowLeft,
  IconArrowRight,
  IconBuildingStore,
  IconCategory2,
  IconClipboardList,
  IconHeart,
  IconHeartFilled,
  IconListDetails,
  IconPlus,
  IconTags,
} from '@tabler/icons-react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Carousel } from '@mantine/carousel';

export default function ProductPage() {
  const theme = useMantineTheme();
  const router = useRouter();
  const { id } = router.query;

  const [showField, setShowField] = useState(false);

  const { data: product, refetch: refetchProduct, isLoading } = api.product.get.useQuery({ id: id as string });

  const { mutate: createCategory } = api.product.createCategory.useMutation({
    onSuccess: () => {
      void refetchProduct();
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const AddCategory = () => {
    return (
      <>
        <Button mb={10} leftIcon={<IconPlus size='0.8rem' stroke={1.5} />} onClick={() => setShowField(!showField)}>
          Add category
        </Button>
        {
          showField && (
            <TextInput
              mb={10}
              icon={<IconCategory2 size='1.1rem' stroke={1.5} />}
              radius='xl'
              size='md'
              ref={inputRef}
              rightSection={
                <ActionIcon size={32} radius='xl' color={theme.primaryColor} variant='filled' onClick={() => {
                  createCategory({
                    name: inputRef.current.value,
                    id: id as string,
                  });
                  inputRef.current.value = '';
                }}>
                  {theme.dir === 'ltr' ? (
                    <IconArrowRight size='1.1rem' stroke={1.5} />
                  ) : (
                    <IconArrowLeft size='1.1rem' stroke={1.5} />
                  )}
                </ActionIcon>
              }
              placeholder='Add category'
              rightSectionWidth={42}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  createCategory({
                    name: e.currentTarget.value,
                    id: id as string,
                  });
                  e.currentTarget.value = '';
                }
              }}
            />
          )
        }
      </>
    );
  };

  return (
    <LayoutDashboard>
      <Group mt={5}>
        <ActionIcon component={Link} href={'/dashboard'} title={'Go back to products'} variant='default' size={18}>
          <IconArrowBack size='0.8rem' stroke={1.5} />
        </ActionIcon>
        PRODUCT LIST
      </Group>
      <Container my='md'>
        <SimpleGrid cols={1} spacing='md' breakpoints={[{ minWidth: 'md', cols: 2 }]}>
          <Group>
            <h1>Product: {product?.name}</h1>
            <ActionIcon variant='heart' radius='md' size={36}>
              {product?.isFavorite ? <IconHeartFilled size='1.1rem' stroke={1.5} /> :
                <IconHeart size='1.1rem' stroke={1.5} />}
            </ActionIcon>
          </Group>
          {isLoading ?
            <Skeleton height={'30rem'} radius='md' animate={true} />
            :
            <Grid gutter='md' p={10}>
              <Grid.Col>
                <Tabs variant='outline' defaultValue='categories'>
                  <Tabs.List>
                    <Carousel
                      align='start'
                      slideSize='50%'
                      slideGap='xs'
                      withControls={false}
                      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
                      slidesToScroll={2}
                      style={{ overflow: 'hidden' }}
                    >
                      <Tabs.Tab value='categories' icon={<IconTags size='0.8rem' />}>Categories</Tabs.Tab>
                      <Tabs.Tab value='remaining' icon={<IconListDetails size='0.8rem' />}>Remaining</Tabs.Tab>
                      <Tabs.Tab value='store' icon={<IconBuildingStore size='0.8rem' />}>Store</Tabs.Tab>
                      <Tabs.Tab value='project' icon={<IconClipboardList size='0.8rem' />}>Project</Tabs.Tab>
                    </Carousel>
                  </Tabs.List>

                  <Tabs.Panel value='categories' pt='xs'>
                    <AddCategory />
                    <Group>
                      {product?.categories?.map(({ category }) => (
                        <Badge key={category.id}>{category.name}</Badge>
                      ))}
                    </Group>
                  </Tabs.Panel>

                  <Tabs.Panel value='remaining' pt='xs'>
                    <Text>Remaining: {product?.remaining?.quantity}</Text>
                  </Tabs.Panel>

                  <Tabs.Panel value='store' pt='xs'>
                    store tab content
                  </Tabs.Panel>

                  <Tabs.Panel value='project' pt='xs'>
                    project tab content
                  </Tabs.Panel>
                </Tabs>
              </Grid.Col>
            </Grid>
          }
        </SimpleGrid>
      </Container>
    </LayoutDashboard>
  );
}
