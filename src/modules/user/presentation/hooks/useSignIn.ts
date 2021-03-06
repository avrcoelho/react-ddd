import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { signInUsecase } from '../../usecases';
import { ISignInArgs } from '../../domain/usecases/ISignIn.usecase';

type SignInHook = () => {
  signIn(data: ISignInArgs): Promise<void>;
  isLoading: boolean;
};

export const useSignIn: SignInHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const signIn = useCallback(
    async (data: ISignInArgs) => {
      setIsLoading(true);

      const response = await signInUsecase.execute(data);
      if (response.isRight()) {
        history.push('/dashboard');
      } else {
        toast.error('Erro ao acessar conta. Verifique seu e-mail/senha');
      }

      setIsLoading(false);
    },
    [history],
  );

  return {
    isLoading,
    signIn,
  };
};
