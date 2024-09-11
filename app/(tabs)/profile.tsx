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

export default function ProfileRoute() {
  return (
    <div className="h-screen  p-5">
      <Card className="w-full max-w-sm my-3">
        <CardHeader>
          <CardTitle className="text-2xl">Vishal</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3">
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p>vishalacharya814@gmail.com</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p>vishalacharya814@gmail.com</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p>vishalacharya814@gmail.com</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p>vishalacharya814@gmail.com</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p>vishalacharya814@gmail.com</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Email</Label>
              <p>vishalacharya814@gmail.com</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Edit</Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-sm my-3">
        <CardHeader>
          <CardTitle className="text-2xl">Membership Details</CardTitle>
          <CardDescription>Your membership details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p>Show membership details here</p>
        </CardContent>
      </Card>
    </div>
  );
}
