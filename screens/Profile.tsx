import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller } from 'react-hook-form';

import Scenes from '~/scenes';
import { ActivityIndicator, Area, Button, Label, Link, TextInput } from '~/components';
import { RootStackScreenProps } from '~/types';
import { useLayout, useProfile, useTheme } from '~/hooks';

export default (props: RootStackScreenProps<'Profile'>) => {
  const {
    data,
    isLoading,
    isUpdating,
    control,
    errors,
    //
    onSubmit,
    clearSession,
  } = useProfile();

  const { colors } = useTheme();
  const { margins } = useLayout();

  const { name, description } = data ?? {};

  return (
    <Scenes.Default>
      <Area flex={1} style={styles.titleContainer}>
        <Label l>Edit profile </Label>
        <Link text="Log&nbsp;out" onPress={clearSession} />
      </Area>

      <Area flex={1} style={[styles.avatarContainer, { marginBottom: 1.6 * margins.default }]}>
        <View style={[styles.avatar, { marginBottom: margins.default }]} />
        {!!name && (
          <Label l style={{ marginBottom: margins.thin }}>
            {name}
          </Label>
        )}
        {!!description && <Label light>{description}</Label>}
      </Area>

      <Area>
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              caption="Name"
              value={value ?? undefined}
              isError={!!errors.name}
              errorText={errors.name?.message}
              //
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {/* E-mail */}
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              caption="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              isError={!!errors.email}
              errorText={errors.email?.message}
              //
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {/* Phone number */}
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              caption="Phone number"
              value={value ?? undefined}
              isError={!!errors.phoneNumber}
              errorText={errors.phoneNumber?.message}
              //
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              caption="Position"
              value={value ?? undefined}
              isError={!!errors.description}
              errorText={errors.description?.message}
              //
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {/* Skype name */}
        <Controller
          name="skypeName"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              caption="Skype"
              value={value ?? undefined}
              isError={!!errors.skypeName}
              errorText={errors.skypeName?.message}
              //
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </Area>

      <Area flex={1} />

      <Button
        title="Save"
        activity={isUpdating}
        //
        onPress={onSubmit}
      />

      <ActivityIndicator activity={isLoading} style={{ backgroundColor: colors.shading }} />
    </Scenes.Default>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avatarContainer: {
    alignItems: 'center',
  },

  avatar: {
    width: 60,
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#0002',
  },
});
