import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import api from '~/api';
import { queryClient } from '~/services';
import { schemas, validationResolver } from '~/utils';

import { useSession } from './useSession';

export function useProfile() {
  const session = useSession();

  const { data, isLoading } = useQuery(['profile'], () => api.profile.getProfile(session.data));

  const {
    isLoading: isUpdating,
    //
    mutate: updateProfile,
  } = useMutation(api.profile.updateProfile, {
    onSuccess() {
      queryClient.invalidateQueries(['profile']);
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<schemas.ProfileSchema>({
    values: data,
    resolver: validationResolver(schemas.profileSchema),
  });

  const onSubmit = handleSubmit(current => updateProfile(current));

  const { clearSession } = session;

  return {
    data,
    isLoading,
    isUpdating,
    control,
    errors,
    //
    onSubmit,
    clearSession,
  };
}
