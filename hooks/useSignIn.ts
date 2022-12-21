import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import api from '~/api';
import { schemas, validationResolver } from '~/utils';

import { useSession } from './useSession';

export function useSignIn() {
  const { startSession } = useSession();

  const {
    isLoading,
    //
    mutate: signIn,
  } = useMutation(api.profile.signIn, {
    onSuccess(data) {
      startSession(data);
    },

    onError({ message, field }) {
      if (field) setError(field, { message });
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<schemas.SignInSchema>({
    resolver: validationResolver(schemas.signInSchema),
  });

  const onSubmit = handleSubmit(data => signIn(data));

  return {
    control,
    errors,
    isLoading,
    //
    onSubmit,
  };
}
