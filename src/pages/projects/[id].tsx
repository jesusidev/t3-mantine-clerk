// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRouter } from 'next/router';
import LayoutDashboard from '~/layouts/dashboard';
import { api } from '~/utils/api';
import { ActionIcon, Badge, Grid, TextInput, useMantineTheme } from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconPackages } from '@tabler/icons-react';
import { useRef } from 'react';
import { TableSelection } from '~/components/table';

export default function ProjectPage() {
  const theme = useMantineTheme();
  const router = useRouter();
  const { id } = router.query;

  const { data: project } = api.project.get.useQuery({ id: id as string });
  const { data: products, refetch: refetchProducts } = api.product.getByProject.useQuery({
    projectId: id as string,
  });

  const { mutate: createProduct } = api.product.createByProject.useMutation({
    onSuccess: () => {
      void refetchProducts();
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);


  return (
    <LayoutDashboard>
      <Grid gutter='md'>
        <Grid.Col>
          <h1>Project {project?.name}</h1>
          <Badge>{project?.status}</Badge>
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
                  brand: 'test',
                  sku: Math.ceil(Math.random() * 10000).toString(),
                  projectId: id as string,
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
                  brand: 'test',
                  sku: Math.ceil(Math.random() * 10000).toString(),
                  projectId: id as string,
                });
                e.currentTarget.value = '';
              }
            }}
          />
          <TableSelection data={products} />
        </Grid.Col>
      </Grid>

    </LayoutDashboard>
  );
}
