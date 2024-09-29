import { format } from "date-fns";
import ShadLayout from "../components/shad/shad-layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { getWorkoutHistory } from "../source/api/workout/workout-history";
import { useAuth } from "../source/store/auth.store";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function WorkoutLogs() {
    const user = useAuth.use.user();
    const { data: workoutHistory } = getWorkoutHistory({
      variables: { id: user?.id },
      select: (response: any) => {
        return response.data.rows;
      },
    });
    
    return <ShadLayout>
        <div className="p-6">
          <div className="flex  items-center">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>

        <ArrowLeft />
            </Button>
        <p className="pl-2 text-xl font-semibold font-mono">
          Workouts Logs
        </p>
          </div>
        {workoutHistory?.map((item:any) => {
            return   <Card className="my-3" key={item?.exercise?.name}>
            <CardHeader className="px-4 pt-4 pb-1">
              <CardTitle>{item?.exerciseName}</CardTitle>
              <CardDescription>{item?.exercise?.level}</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex justify-between items-end">
              <div>
                {/* <p className="text-sm text-muted-foreground">
                  {item.workoutTemplateDetail.restBwRepsInS} seconds rest
                  bw reps
                </p> */}
                <p className="text-sm text-muted-foreground">
                Burnt {item.approxCalorieBurn} Calories
                </p>
                <p className="text-sm text-muted-foreground">
                {format(item.createdAt, "MMM dd yyyy hh:mm:ss")}
                </p>
              </div>
         
            </CardContent>
          </Card>
        })}
      
        </div>
    </ShadLayout>
    
}
