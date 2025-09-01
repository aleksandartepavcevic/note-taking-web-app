import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterForm, registerFormSchema } from '../Register.schemas';
import useNextAuth from '../../hooks/useNextAuth';
import { ProviderId } from 'next-auth/providers';
import { handleCredentialsSignup } from '../../actions/register';

const useRegister = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
        useState(false);

    const defaultValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    } satisfies RegisterForm;

    const form = useForm<RegisterForm>({
        defaultValues,
        resolver: zodResolver(registerFormSchema),
    });

    const {
        handleLogin,
        isLoggingInWithCredentials: isSigningUpWithCredentials,
        isLoggingInWithGithub: isSigningUpWithGithub,
    } = useNextAuth();

    const handleProviderRegister = async <P extends ProviderId>(
        providerId: P,
        values?: P extends 'credentials' ? RegisterForm : never,
    ) => {
        try {
            if (providerId === 'credentials') {
                const response = await handleCredentialsSignup(
                    values as RegisterForm,
                );

                if (!response.status) {
                    form.setError('root', {
                        message: 'An unexpected error occurred.',
                    });
                    return;
                }
                console.log('RESPONSE -->', response);
            }

            const response = await handleLogin(providerId, values);

            console.log('response', response);

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

    const handleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisibility((prev) => !prev);
    };

    return {
        form,
        handlePasswordVisibility,
        handleConfirmPasswordVisibility,
        passwordVisibility,
        confirmPasswordVisibility,
        handleProviderRegister,
        isSigningUpWithCredentials,
        isSigningUpWithGithub,
    };
};

export default useRegister;
