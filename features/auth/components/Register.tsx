'use client';

import React from 'react';
import Link from 'next/link';
import { GithubIcon } from 'lucide-react';
import { LoadingButton } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import useRegister from '../hooks/useRegister';

const Register = () => {
    const {
        form,
        handleProviderRegister,
        handlePasswordVisibility,
        handleConfirmPasswordVisibility,
        confirmPasswordVisibility,
        passwordVisibility,
        isSigningUpWithCredentials,
        isSigningUpWithGithub,
    } = useRegister();

    return (
        <>
            <CardHeader>
                <Typography variant="h1" className="text-center">
                    Create Your Account
                </Typography>
                <Typography
                    variant="p1"
                    className="text-center text-muted-foreground">
                    Sign up to start organizing your notes and boost your
                    productivity.
                </Typography>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) =>
                            handleProviderRegister('credentials', values),
                        )}
                        className="space-y-2"
                        noValidate>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="email@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={
                                                passwordVisibility
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            endIcon={
                                                passwordVisibility ? (
                                                    <EyeIcon
                                                        className="w-4 h-4"
                                                        onClick={
                                                            handlePasswordVisibility
                                                        }
                                                    />
                                                ) : (
                                                    <EyeOffIcon
                                                        className="w-4 h-4"
                                                        onClick={
                                                            handlePasswordVisibility
                                                        }
                                                    />
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={
                                                confirmPasswordVisibility
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            endIcon={
                                                confirmPasswordVisibility ? (
                                                    <EyeIcon
                                                        className="w-4 h-4"
                                                        onClick={
                                                            handleConfirmPasswordVisibility
                                                        }
                                                    />
                                                ) : (
                                                    <EyeOffIcon
                                                        className="w-4 h-4"
                                                        onClick={
                                                            handleConfirmPasswordVisibility
                                                        }
                                                    />
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <LoadingButton
                            className="w-full mt-2"
                            loading={isSigningUpWithCredentials}>
                            Register
                        </LoadingButton>
                    </form>
                    <hr className="my-4" />
                    <Typography
                        variant="p2"
                        className="text-center my-4 text-muted-foreground">
                        Or log in with:
                    </Typography>
                    <LoadingButton
                        className="w-full"
                        variant="outline"
                        onClick={() => handleProviderRegister('github')}
                        loading={isSigningUpWithGithub}>
                        <div className="flex items-center justify-center gap-1">
                            <GithubIcon className="w-4 h-4" /> Continue with
                            GitHub
                        </div>
                    </LoadingButton>
                    <hr className="my-2" />
                    <Typography
                        variant="p2"
                        className="text-center text-muted-foreground my-4">
                        Already have an account?{' '}
                        <Link className="underline" href="/login">
                            Log In
                        </Link>
                    </Typography>
                </Form>
            </CardContent>
        </>
    );
};

export default Register;
