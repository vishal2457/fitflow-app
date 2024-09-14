import { LogOut, Notebook, User } from "lucide-react-native";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Label } from "../../components/ui/label";
import { BASE_API_URL } from "../../source/api";
import { getMembershipDetail } from "../../source/api/user/get-user-membership";
import { signOut, useAuth } from "../../source/store/auth.store";
import { format } from "date-fns";
import AppHeader from "../../components/shad/app-header";

export default function ProfileRoute() {
  const user = useAuth.use.user();

  const { data: membershipDetail } = getMembershipDetail({
    variables: {
      id: user?.id,
    },
    select: (data) => {
      return data.data;
    },
  });

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
            <Button className="w-full">Edit</Button>
          </CardFooter>
        </Card>
      </div>
    </ShadLayout>
  );
}
