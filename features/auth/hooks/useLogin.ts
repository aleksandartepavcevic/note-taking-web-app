import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import useNextAuth from './useNextAuth';
import { ProviderId } from 'next-auth/providers';
import { LoginForm, loginFormSchema } from '../schemas/login.schemas';

const useLogin = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const defaultValues = {
        email: '',
        password: '',
    } satisfies LoginForm;

    const form = useForm<LoginForm>({
        defaultValues,
        resolver: zodResolver(loginFormSchema),
    });

    const { handleLogin, isLoggingInWithCredentials, isLoggingInWithGithub } =
        useNextAuth();

    const handleProviderLogin = async <P extends ProviderId>(
        providerId: P,
        values?: P extends 'credentials' ? LoginForm : never,
    ) => {
        try {
            const response = await handleLogin(providerId, values);

            if (!response?.success && providerId === 'credentials') {
                form.setError('root', {
                    message:
                        response?.message ||
                        'Something went wrong, please try again later.',
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                form.setError('root', {
                    message:
                        error?.message ||
                        'Something went wrong, please try again later.',
                });
            }
        }
    };

    const handlePasswordVisibility = () => {
        setPasswordVisibility((prev) => !prev);
    };

    return {
        form,
        handlePasswordVisibility,
        passwordVisibility,
        handleProviderLogin,
        isLoggingInWithCredentials,
        isLoggingInWithGithub,
    };
};

export default useLogin;
