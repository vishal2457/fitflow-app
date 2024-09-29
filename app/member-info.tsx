import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ShadLayout from "../components/shad/shad-layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { updateUser } from "../source/api/user/update-user";
import { useAuth } from "../source/store/auth.store";

// Define the schema using Zod
const profileInfoSchema = z.object({
  age: z.coerce.number(),
  weight: z.string(),
  weightGoal: z.string(),
  height: z.coerce.number(),
  gender: z.string(),
});

export default function ProfileRoute() {
  const user = useAuth.use.user();
  const setUser = useAuth.use.setUser();
  const { mutate: updateUserFunc, isPending: loginLoading } = updateUser({
    onSuccess: (response) => {  
      setUser(response.data.data);
      router.push('/');
    }
  });
  
console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: user?.age,
      weight: user?.weight,
      height: user?.height,
      gender: user?.gender,
      weightGoal: user?.weightGoal,
    },
    resolver: zodResolver(profileInfoSchema),
  });


  

  const onSubmit = async (data: any) => {
    updateUserFunc({...user, ...data})    
  };

  return (
    <ShadLayout>
      <div className="h-screen  p-5">
        <p className="font-mono font-semibold">Complete profile</p>
        <p className="text-sm text-muted-foreground">
          Enter your basic details
        </p>
        <div className="my-6 gap-6 grid">
          <Input
            id="Age"
            type="number"
            label="Age"
            placeholder="Enter your age"
            {...register('age')}
          />
          <Input
            label="Current Weight"
            id="weight"
            type="number"
            placeholder="Enter your weight"
            {...register('weight')}

          />
          <Input
            label="Weight Goal"
            id="weightGoal"
            type="number"
            placeholder="What is your weight goal"
            {...register('weightGoal')}
          />
          <Input
            label="Height"
            id="height"
            type="number"
            placeholder="Enter your height"
            {...register('height')}

          />
          <div className="grid gap-2">
            <Label>Gender</Label>
            <Select {...register('gender')}>
              <SelectTrigger id="gender" aria-label="Select gender">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </div>
      </div>
    </ShadLayout>
  );
}
