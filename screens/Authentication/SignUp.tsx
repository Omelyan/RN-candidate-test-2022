import { StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

import Scenes from '~/scenes';
import { Area, Button, Icon, Label, TextInput } from '~/components';
import { RootStackScreenProps } from '~/types';
import { useLayout, useSignUp } from '~/hooks';

export default (props: RootStackScreenProps<'SignUp'>) => {
  const {
    control,
    errors,
    isLoading,
    //
    onSubmit,
  } = useSignUp();

  const { margins } = useLayout();

  return (
    <Scenes.Default>
      <Area flex={1} />

      <Area>
        <Icon name="Logo" style={{ marginBottom: margins.default }} />
      </Area>

      <Area style={styles.titleContainer}>
        <Label xl>Sign up to Woorkroom</Label>
      </Area>

      <Area flex={1} />

      <Area>
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              caption="Your name"
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

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              caption="Password"
              autoCapitalize="none"
              textContentType="password"
              value={value}
              isError={!!errors.password}
              errorText={errors.password?.message}
              //
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </Area>

      <Area flex={2}></Area>

      <Button
        title="Next"
        activity={isLoading}
        //
        onPress={onSubmit}
      />
    </Scenes.Default>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
