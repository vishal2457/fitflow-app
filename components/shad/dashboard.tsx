"use dom";

import "@/global.css";

import ShadLayout from "@/components/shad/shad-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { CheckCheck } from "lucide-react-native";
import { useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Label, PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { useDelete } from "../../source/api/common/use-delete";
import { getTodaysWorkout } from "../../source/api/workout/get-todays-workout";
import { addWorkoutLog } from "../../source/api/workout/log-workout";
import { getRandomQuote } from "../../source/utils/random-quotes";
import { Button } from "../ui/button";
import { ChartContainer } from "../ui/chart";

export default function DashboardRoute({ navigate }: Props) {
  const [quote] = useState(getRandomQuote());

  const {
    data,
    isPending,
    refetch: refetchTodaysWorkout,
  } = getTodaysWorkout({
    variables: { id: 7 },
    select: (data) => {
      const workouts: any[] = data.data.todaysWorkout;

      const result = {
        dayName: workouts?.[0]?.workoutTemplateDetail?.dayName,
        day: workouts?.[0]?.workoutTemplateDetail?.day,
        workoutDetail: workouts,
        totalWorkouts: workouts.length,
        calorieBurn: 0,
        totalMinutes: 0,
        completedExercise: 0,
        burntCalories: 0,
      };

      const todaysWorkout = workouts.reduce((acc, curr) => {
        acc = {
          ...acc,
          calorieBurn:
            acc.calorieBurn + curr.workoutTemplateDetail.approxCalorieBurn,
          totalMinutes: acc.totalMinutes + curr.workoutTemplateDetail.timeInM,
          completedExercise: curr.memberWorkoutLog
            ? acc.completedExercise + 1
            : acc.completedExercise,
          burntCalories: curr?.memberWorkoutLog?.approxCalorieBurn
            ? acc.burntCalories + curr?.memberWorkoutLog?.approxCalorieBurn
            : acc.burntCalories,
        };
        return acc;
      }, result);

      return { todaysWorkout, manuallyAdded: data.data.workoutLoggedToday };
    },
  });

  const { mutate: addWorkout, isPending: addWorkoutLogLoader } = addWorkoutLog({
    onSuccess: () => {
      refetchTodaysWorkout();
    },
  });

  const logWorkout = (item: any) => {
    addWorkout([
      {
        workoutTemplateDetailID: item.workoutTemplateDetail.id,
        reps: item.workoutTemplateDetail.reps,
        sets: item.workoutTemplateDetail.set,
        exerciseName: item.exercise.name,
        completedTime: item.workoutTemplateDetail.timeInM,
        approxCalorieBurn: item.workoutTemplateDetail.approxCalorieBurn,
        day: item.workoutTemplateDetail.day,
      },
    ]);
  };

  const { mutate: undoWorkoutLog, isPending: undoLoading } = useDelete({
    onSuccess: () => {
      refetchTodaysWorkout();
    },
  });

  const completedPercentage = useMemo(() => {
    return  (data?.todaysWorkout?.completedExercise * 100) / data?.todaysWorkout?.totalWorkouts
   }, [data?.todaysWorkout?.completedExercise , data?.todaysWorkout?.totalWorkouts])
 

  if (isPending) {
    return (
      <div className="h-screen flex flex-row items-center justify-center">
        <ActivityIndicator animating size="large" color="#0000ee" />
      </div>
    );
  }



  return (
    <ShadLayout navigate={navigate}>
      <div className="p-3 pt-6">
        <p className="pl-3 text-lg  font-semibold font-mono">Hello, vishal</p>
        <p className="pl-3 pt-1 text-muted-foreground text-xs font-mono">{quote}</p>
        <div className="my-4 mt-6">
        <Card className="md:max-w-xs" x-chunk="charts-01-chunk-5">
          <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Calories Burnt</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {data?.todaysWorkout?.burntCalories}/{data?.todaysWorkout?.calorieBurn}
                  <span className="text-sm font-normal text-muted-foreground">
                    kcal
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Exercise</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {data?.todaysWorkout?.completedExercise}/{data?.todaysWorkout?.totalWorkouts}
                  <span className="text-sm font-normal text-muted-foreground">
                    min
                  </span>
                </div>
              </div>
            </div>
            <ChartContainer
              config={{
                move: {
                  label: "Move",
                  color: "hsl(var(--chart-1))",
                },
                exercise: {
                  label: "Exercise",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="mx-auto aspect-square w-full max-w-[80%]"
            >
              <RadialBarChart
                margin={{
                  left: -10,
                  right: -10,
                  top: -10,
                  bottom: -10,
                }}
                data={[
                
                  {
                    activity: "move",
                    value: completedPercentage,
                    fill: "var(--color-move)",
                  },
                ]}
                innerRadius="90%"
                outerRadius={55}
                barSize={60}
                startAngle={0}
                endAngle={360}
              >
                
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  dataKey="value"
                  tick={false}
                  tickLine={false} axisLine={false}
                />
                
                <RadialBar dataKey="value" background cornerRadius={5} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {completedPercentage.toFixed(0)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          completed
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        </div>
        <Card className="md:max-w-xs" x-chunk="charts-01-chunk-4">
          <CardHeader className="p-4">
            <CardTitle>Time to complete</CardTitle>
            <CardDescription className="text-xs">
               estimated complete time for today's workout session
            </CardDescription>
            <CardContent className="p-0">
            <div className="flex items-baseline  text-2xl font-bold tabular-nums leading-none">
            {data?.todaysWorkout?.totalMinutes}
                  <span className="text-sm font-normal text-muted-foreground">
                    min
                  </span>
                </div>
            
            </CardContent>
          </CardHeader>
        </Card>
        <div className="pt-8">
          <p className="pl-3 text-xl font-semibold font-mono">Today's Workout</p>
          <p className="pl-3 text-muted-foreground font-semibold font-mono text-sm">
            {data?.todaysWorkout?.dayName}
          </p>
          <div className="my-3 mt-5">
            {data?.todaysWorkout?.workoutDetail.map((item: any) => {
              return (
                <Card className="my-3" key={item?.exercise?.name}>
                  <CardHeader className="px-4 pt-4 pb-1">
                    <CardTitle>{item?.exercise?.name}</CardTitle>
                    <CardDescription>{item?.exercise?.level}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 flex justify-between items-end">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.workoutTemplateDetail.restBwRepsInS} seconds rest
                        bw reps
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Burns {item.workoutTemplateDetail.approxCalorieBurn}{" "}
                        Calories
                      </p>
                    </div>
                    {item.memberWorkoutLog ? (
                      <Button
                        onClick={() =>
                          undoWorkoutLog({
                            endpoint: `/member/delete-member-workout/${item?.memberWorkoutLog.id}`,
                          })
                        }
                        variant="secondary"
                        size="sm"
                      >
                        <CheckCheck
                          size={15}
                          style={{ marginRight: 5 }}
                          color={`green`}
                        />
                        Undo
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => logWorkout(item)}
                      >
                        <CheckCheck size={15} style={{ marginRight: 5 }} />
                        Mark Done
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </ShadLayout>
  );
}

type Props = {
  navigate: typeof import("expo-router").router["navigate"];

  ref?: import("react").RefObject<import("react-native-webview").WebView>;
  dom?: import("expo/dom").DOMProps;
};
