import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import api from '~/api';
import { SessionData } from '~/context';
import { APIError, schemas, validationResolver } from '~/utils';

import { useSession } from './useSession';

export function useSignUp() {
  const { startSession } = useSession();

  const {
    isLoading,
    //
    mutate: signUp,
  } = useMutation<SessionData, APIError<schemas.SignUpSchema>, schemas.SignUpSchema>(
    api.profile.signUp,
    {
      onSuccess(data) {
        startSession(data);
      },

      onError({ message, field }) {
        if (field) setError(field, { message });
      },
    }
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<schemas.SignUpSchema>({
    resolver: validationResolver(schemas.signUpSchema),
  });

  const onSubmit = handleSubmit(data => signUp(data));

  return {
    control,
    errors,
    isLoading,
    //
    onSubmit,
  };
}
