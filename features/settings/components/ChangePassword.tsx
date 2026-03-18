'use client';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import useChangePassword from '../hooks/useChangePassword';
import { EyeIcon, EyeOffIcon, InfoIcon } from 'lucide-react';
import { ChangePasswordForm } from '../schemas';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

const ChangePassword = () => {
    const {
        form,
        passwordVisibility,
        handlePasswordVisibility,
        handleChangePassword,
    } = useChangePassword();
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleChangePassword)}
                className="max-w-[350px] space-y-3"
                noValidate>
                {['old', 'new', 'confirm'].map((field) => (
                    <FormField
                        key={field}
                        control={form.control}
                        name={field as keyof ChangePasswordForm}
                        render={({ field: fieldMethods }) => (
                            <FormItem>
                                <FormLabel>
                                    {field[0].toUpperCase() + field.slice(1)}{' '}
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...fieldMethods}
                                        type={
                                            passwordVisibility[
                                                field as keyof ChangePasswordForm
                                            ]
                                                ? 'text'
                                                : 'password'
                                        }
                                        endIcon={
                                            passwordVisibility[
                                                field as keyof ChangePasswordForm
                                            ] ? (
                                                <EyeIcon
                                                    className="w-4 h-4"
                                                    onClick={() =>
                                                        handlePasswordVisibility(
                                                            field as keyof ChangePasswordForm,
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <EyeOffIcon
                                                    className="w-4 h-4"
                                                    onClick={() =>
                                                        handlePasswordVisibility(
                                                            field as keyof ChangePasswordForm,
                                                        )
                                                    }
                                                />
                                            )
                                        }
                                    />
                                </FormControl>
                                {field === 'new' && (
                                    <FormDescription className="flex items-center gap-2">
                                        <InfoIcon className="w-3 h-3" /> At
                                        least 8 characters
                                    </FormDescription>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                {form.formState.errors['root'] && (
                    <Typography variant="p2" className="text-destructive">
                        {form.formState.errors['root']?.message}
                    </Typography>
                )}
                <Button className="float-end">Save password</Button>
            </form>
        </Form>
    );
};

export default ChangePassword;
