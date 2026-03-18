import { useForm } from 'react-hook-form';
import { ChangePasswordForm, changePasswordSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import changePassword from '../actions/change-password';

const useChangePassword = () => {
    const [passwordVisibility, setPasswordVisiblity] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const handlePasswordVisibility = (field: keyof ChangePasswordForm) => {
        setPasswordVisiblity((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const defaultValues = {
        old: '',
        new: '',
        confirm: '',
    } satisfies ChangePasswordForm;

    const form = useForm<ChangePasswordForm>({
        defaultValues,
        resolver: zodResolver(changePasswordSchema),
    });

    console.log('form', form.formState.errors);

    const handleChangePassword = async (values: ChangePasswordForm) => {
        try {
            const response = await changePassword(values);
            console.log('response', response);
            if (!response?.success) {
                form.setError('root', {
                    message:
                        response?.message || 'An unexpected error occurred.',
                });
            }
        } catch (error) {
            console.log('error', error);
            if (error instanceof Error) {
                form.setError('root', {
                    message: error.message || 'An unexpected error occurred.',
                });
            }
        }
    };

    return {
        form,
        passwordVisibility,
        handlePasswordVisibility,
        handleChangePassword,
    };
};

export default useChangePassword;
