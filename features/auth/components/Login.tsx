'use client';

import { LoadingButton } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, GithubIcon } from 'lucide-react';
import Link from 'next/link';
import useLogin from '../hooks/useLogin';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const Login = () => {
    const {
        form,
        handleProviderLogin,
        handlePasswordVisibility,
        passwordVisibility,
        isLoggingInWithCredentials,
        isLoggingInWithGithub,
    } = useLogin();

    return (
        <>
            <CardHeader>
                <Typography variant="h1" className="text-center">
                    Welcome to Note
                </Typography>
                <Typography
                    variant="p1"
                    className="text-center text-muted-foreground">
                    Please log in to continue
                </Typography>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) =>
                            handleProviderLogin('credentials', values),
                        )}
                        className="space-y-2"
                        noValidate>
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
                        <LoadingButton
                            className="w-full mt-2"
                            loading={isLoggingInWithCredentials}>
                            Login
                        </LoadingButton>
                        {form.formState.errors['root'] && (
                            <Typography
                                variant="p2"
                                className="text-destructive">
                                {form.formState.errors['root']?.message}
                            </Typography>
                        )}
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
                        onClick={() => handleProviderLogin('github')}
                        loading={isLoggingInWithGithub}>
                        <div className="flex items-center justify-center gap-1">
                            <GithubIcon className="w-4 h-4" /> Continue with
                            GitHub
                        </div>
                    </LoadingButton>
                    <hr className="my-2" />
                    <Typography
                        variant="p2"
                        className="text-center text-muted-foreground my-4">
                        No account yet?{' '}
                        <Link className="underline" href="/register">
                            Sign Up
                        </Link>
                    </Typography>
                </Form>
            </CardContent>
        </>
    );
};

export default Login;
