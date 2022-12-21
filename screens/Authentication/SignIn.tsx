import { StyleSheet, View } from 'react-native';
import { Controller } from 'react-hook-form';

import Scenes from '~/scenes';
import { Area, Button, Icon, Label, Link, TextInput } from '~/components';
import { RootStackScreenProps } from '~/types';
import { useLayout, useSignIn } from '~/hooks';

export default ({ navigation }: RootStackScreenProps<'SignIn'>) => {
  const {
    control,
    errors,
    isLoading,
    //
    onSubmit,
  } = useSignIn();

  const { margins } = useLayout();

  const onCreateAccount = () => {
    navigation.navigate('SignUp');
  };

  return (
    <Scenes.Default>
      <Area flex={1} />

      <Area>
        <Icon name="Logo" style={{ marginBottom: margins.default }} />
      </Area>

      <Area style={styles.titleContainer}>
        <Label xl>Log in to Woorkroom</Label>
      </Area>

      <Area flex={1} />

      <Area>
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

      <Area flex={2} />

      <Button
        title="Log&nbsp;in"
        activity={isLoading}
        //
        onPress={onSubmit}
      />

      <View style={[styles.footerContainer, { marginVertical: margins.default }]}>
        <Label light>New user? </Label>
        <Link text="Create account" onPress={onCreateAccount} />
      </View>
    </Scenes.Default>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
