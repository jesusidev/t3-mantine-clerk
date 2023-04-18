import { Button, Container, Modal, Paper, TextInput, Title, useMantineTheme } from '@mantine/core';
import React from 'react';
import { api } from '~/utils/api';
import { useForm } from '@mantine/form';

export default function ModalCreateProject({ opened, close }: { opened: boolean; close: () => void; }) {
  const theme = useMantineTheme();
  const [formError, setFormError] = React.useState<string | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
    },
  });

  const { refetch: refetchProducts } = api.project.getAll.useQuery();

  const { mutate: createproject } = api.project.create.useMutation({
    onSuccess: () => {
      void close();
      void refetchProducts();
    },
    onError: (error) => {
      console.error('ERROR:', error.message);
      if (error.message.includes('Unique constraint failed on the fields: (`name`)')) {
        setFormError('Project Name already exists, Please use a different projects name.');
        return;
      }
    },
  });


  const onFormSubmit = (values: ReturnType<(values: { name: string; }) => { name: string; }>) => {
    createproject({ name: values.name });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={false}
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <Container size={420} my={40}>
        <Title align='center' order={3}>
          Please Enter Your Project Name:
        </Title>
        {formError && <div style={{ color: 'red' }}>{formError}</div>}


        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>
            <TextInput error label='Project Name:' placeholder='Art Frame' required
                       withAsterisk {...form.getInputProps('name')} />
            <Button fullWidth mt='xl' type='submit'>
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </Modal>
  );
}
