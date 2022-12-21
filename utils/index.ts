import { miscellaneous } from '~/constants';

import * as schemas from './schemas';

const validationResolver = schemas.resolver;

export { validationResolver, schemas };

/* I used Yup a long time ago, and currently can't figure out
why it infers the required strings as possibly undefined...
(https://github.com/jquense/yup/issues/1367) */
export function nullUndefined(value: any) {
  if (value === undefined) return null;
  return value;
}

export function delayed(callback: () => void, factor: number = 1) {
  setTimeout(callback, miscellaneous.stupidness * factor);
}

export class APIError<Keys = unknown> {
  message: string;
  field?: keyof Keys;

  constructor(message: string, filed?: keyof Keys) {
    this.message = message;
    this.field = filed;
  }
}
