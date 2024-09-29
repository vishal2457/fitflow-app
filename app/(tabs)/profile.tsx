import { format } from "date-fns";
import AppHeader from "../../components/shad/app-header";
import ShadLayout from "../../components/shad/shad-layout";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { BASE_API_URL } from "../../source/api";
import { getMembershipDetail } from "../../source/api/user/get-user-membership";
import { hydrateAuth, useAuth } from "../../source/store/auth.store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "../../components/ui/textarea";
import { updateUser } from "../../source/api/user/update-user";

export default function ProfileRoute() {
  const user = useAuth.use.user();
  const [open, setopen] = useState(false);

  const { data: membershipDetail } = getMembershipDetail({
    variables: {
      id: user?.id,
    },
    select: (data) => {
      return data.data;
    },
  });


  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
     email: user?.email,
     age: user?.age,
     height: user?.height,
     mobile: user?.mobile,
     address: user?.address
    },
  });
  

  const {mutate: updateUserFunc} = updateUser({
    onSuccess: (response) => {
      hydrateAuth();
      setopen(false)
    },
  });

  const submitProfile = (data:any) => {    
    updateUserFunc({...user, ...data});
};

  return (
    <ShadLayout>
      <div className="h-screen  p-5">
        <AppHeader />
        <div className="relative">
          <Avatar className="h-36 w-36 absolute -top-[5.5rem] right-[4.75rem] border-4  border-primary">
            <AvatarImage src={`${BASE_API_URL}/static/${user?.profilePic}`} />
            <AvatarFallback className="uppercase text-4xl">
              {user?.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <Card className="w-full max-w-sm my-3 mt-24 pt-10 text-center ">
            <CardHeader>
              <CardTitle className="text-2xl font-mono">{user?.name}</CardTitle>
              <CardDescription>Current active membership</CardDescription>
            </CardHeader>
            <CardContent>
              {membershipDetail ? (
                <p className="text-2xl ">
                  {format(membershipDetail?.startDate, "MMM yy")} -{" "}
                  {format(membershipDetail?.endDate, "MMM yy")}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
        <Card className="w-full max-w-sm my-3">
          <CardHeader>
            <CardTitle className="text-2xl font-mono">
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-3">
              <div>
                <Label className="text-muted-foreground">Trainer</Label>
                <p>{user?.trainer?.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p>{user?.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Age</Label>
                <p>{user?.age}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Height</Label>
                <p>{user?.height}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Gender</Label>
                <p>{user?.gender}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Mobile</Label>
                <p>{user?.mobile}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Address</Label>
                <p>{user?.address}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Sheet open={open}>
              <SheetTrigger className="w-full">
                {" "}
                <Button className="w-full" variant="secondary" onClick={() => setopen(true)} >Edit</Button>
              </SheetTrigger>
              <SheetContent side="bottom" hideClose>
                <SheetHeader className="text-left mb-5 flex flex-row items-center justify-between">
                  <SheetTitle>Edit Profile</SheetTitle>
                  <Cross2Icon
                    onClick={() => setopen(false)}
                    className="h-4 w-4"
                  />
                </SheetHeader>

                <div className="flex flex-col gap-4">
                  <div>
                    <Label >Email</Label>
                    <Input
                      placeholder="Enter email"
                      type="email"
                      {...register("email")}
                    />
                  </div>
                  <div>
                    <Label >Age</Label>
                    <Input
                      placeholder="Enter age"
                      type="number"
                      {...register("age")}
                    />
                  </div>
                  <div>
                    <Label >Height</Label>
                    <Input
                      placeholder="Enter height"
                      type="number"
                      {...register("height")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Mobile</Label>
                    <Input
                      placeholder="Enter mobile"
                      {...register("mobile")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Address</Label>
                    <Textarea
                      placeholder="Enter address"
                      {...register("address")}
                    />
                  </div>
                  <Button onClick={handleSubmit(submitProfile)}>Submit</Button>
                </div>
              </SheetContent>
            </Sheet>
          </CardFooter>
        </Card>
      </div>
    </ShadLayout>
  );
}
