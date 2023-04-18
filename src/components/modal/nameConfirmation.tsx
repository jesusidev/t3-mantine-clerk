import { useDisclosure } from '@mantine/hooks';
import { Button, Container, Modal, Paper, TextInput, Title, useMantineTheme } from '@mantine/core';
import React from 'react';
import { api } from '~/utils/api';
import { useForm } from '@mantine/form';
import { useUser } from '@clerk/nextjs';

export default function ModalNameConfirmation() {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const { user } = useUser();
  React.useEffect(() => {
    open();
  }, [open]);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
    },
  });

  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      void close();
    },
    onError: (error) => {
      console.error('ERROR:', error.message);
      if (error.message.includes('Unique constraint failed on the fields: (`id`)')) {
        setFormError('Email already exists, Please login with your email and password or reset your password.');
        return;
      }
    },
  });

  const onFormSubmit = (values: ReturnType<(values: { firstName: string; lastName: string }) => { firstName: string; lastName: string }>) => {
    createUser.mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      email: user?.primaryEmailAddress?.emailAddress as string,
    });
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
          Please Enter Your Name:
        </Title>
        {formError && <div style={{ color: 'red' }}>{formError}</div>}


        <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
          <form onSubmit={form.onSubmit((values) => onFormSubmit(values))}>
            <TextInput label='FirstName' placeholder='Test' required
                       withAsterisk {...form.getInputProps('firstName')} />
            <TextInput label='LastName' placeholder='Test' required withAsterisk {...form.getInputProps('lastName')} />
            <Button fullWidth mt='xl' type='submit'>
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </Modal>
  );
}
