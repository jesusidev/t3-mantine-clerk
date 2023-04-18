// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  ActionIcon,
  Button,
  createStyles,
  getStylesRef,
  Grid,
  rem,
  Skeleton,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useRef, useState } from 'react';
import { api } from '~/utils/api';
import { useUser } from '@clerk/nextjs';
import { IconArrowLeft, IconArrowRight, IconPackages } from '@tabler/icons-react';
import ModalNameConfirmation from '~/components/modal/nameConfirmation';
import LayoutDashboard from '~/layouts/dashboard';
import { CardProduct } from '~/components/card/CardProduct';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ModalCreateProduct } from '~/components/modal/CreateProduct';
import { Carousel } from '@mantine/carousel';

export const PRIMARY_COL_HEIGHT = rem(500);

const useStyles = createStyles(() => ({
  product: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },
}));


export default function Dashboard() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const { user } = useUser();
  const [opened, { open, close }] = useDisclosure(false);
  const [showNameConfirmation, setShowNameConfirmation] = useState(false);

  const { data: userInfo } = api.user.get.useQuery(
    {
      enabled: user !== undefined,
      onSuccess: (userInfo) => {
        if (!user?.firstName) {
          console.log('No Account Name Found, Creating Name Confirmation Modal...');
          setShowNameConfirmation(true);
        } else if (!userInfo?.id.includes(user?.id)) {
          console.log('No Account Found, Creating Account...');
          createUser({
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.primaryEmailAddress?.emailAddress,
          });
        }
        return;
      },
    },
  );

  const { data: products, isLoading, refetch: refetchProducts, isError } = api.product.getAll.useQuery();

  const { mutate: createProduct } = api.product.create.useMutation({
    onSuccess: () => {
      void refetchProducts();
    }
  });

  const { mutate: createUser } = api.user.create.useMutation();

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <LayoutDashboard>
      {showNameConfirmation && <ModalNameConfirmation />}
      {opened && <ModalCreateProduct opened={opened} close={close} />}
      <Grid gutter='md'>
        <Grid.Col>
          <TextInput
            mt={10}
            icon={<IconPackages size='1.1rem' stroke={1.5} />}
            radius='xl'
            size='md'
            ref={inputRef}
            rightSection={
              <ActionIcon size={32} radius='xl' color={theme.primaryColor} variant='filled' onClick={() => {
                createProduct({
                  name: inputRef.current.value,
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
            placeholder='Add Product'
            rightSectionWidth={42}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                createProduct({
                  name: e.currentTarget.value,
                });
                e.currentTarget.value = '';
              }
            }}
          />
          <Button onClick={open}>Create Product</Button>
          {isLoading && <Skeleton height={SECONDARY_COL_HEIGHT} radius='md' animate={true} />}
          {isError && <h1>Error Getting Products</h1>}
        </Grid.Col>
        <Grid.Col span={12}>
          {mobile ? (
            <>
              {products?.length < 1 && <h1>No Products Found, Please Create a Product</h1>}
              <Carousel
                slide
                withIndicators
                dragFree
                height='100%'
                withControls={false}
                slideSize='80%'
                slideGap='md'
                slidesToScroll={mobile ? 1 : 2}
                styles={{
                  indicator: {
                    width: rem(12),
                    height: rem(4),
                    transition: 'width 250ms ease',
                    backgroundColor: theme.colors.gray[5],

                    '&[data-active]': {
                      width: rem(40),
                      backgroundColor: theme.colors.teal[6],
                    },
                  },
                }}
              >
                {products?.length > 0 ? products.map((product) => (
                  <Carousel.Slide key={product.id}>
                    <CardProduct
                      key={product.id}
                      id={product.id}
                      image={'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'}
                      link={`products/${product.id}`}
                      title={product.name}
                      description={'item description'}
                      badge={'NEW'}
                      brand={product.brand}
                      isFavorite={product.isFavorite}
                      categories={product.categories}
                      quantity={product.remaining?.quantity}
                    />
                  </Carousel.Slide>
                )) : null}
              </Carousel>
            </>
          ) : (
            <section className={classes.product}>
              {products?.length < 1 && <h1>No Products Found, Please Create a Product</h1>}
              {products?.length > 0 ? products.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  image={'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'}
                  link={`products/${product.id}`}
                  title={product.name}
                  description={'item description'}
                  badge={'NEW'}
                  brand={product.brand}
                  isFavorite={product.isFavorite}
                  categories={product.categories}
                  quantity={product.remaining?.quantity}
                />
              )) : null}
            </section>
          )}
        </Grid.Col>
      </Grid>
    </LayoutDashboard>
  );
}
