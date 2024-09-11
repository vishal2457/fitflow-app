import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useLogin } from "../source/api/user/login";
import { useAuth } from "../source/store/auth.store";
import { Alert } from "react-native";
import { z } from "zod";
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  passcode: z.string().length(4, "Passcode must be of 4 digit"),
});

export default function Login() {
  const signIn = useAuth.use.signIn();
  const { mutate: login, isPending: loginLoading } = useLogin({
    onSuccess: (response) => {
      signIn(response.data.data.token, {
        ...response.data.data.member,
        enableAI: response.data.data.enableAI,
      });
      router.push("/");
    },
    onError: (err: any) => {
      Alert.alert(err.data.msg);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    login(data);
  };
  
  return (
    <div className="h-screen justify-center items-center flex p-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Passcode</Label>
            <Input id="password" type="password" {...register("passcode")} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit(onSubmit)}>
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
