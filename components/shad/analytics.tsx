"use dom";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { ArrowRight, Plus } from "lucide-react-native";
import { Button } from "../ui/button";
import ShadLayout from "./shad-layout";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Label as ShadLabel } from "../ui/label";
import { useAuth } from "../../source/store/auth.store";
import { getWeightHistory } from "../../source/api/user/get-weight-history";
import { format, isToday } from "date-fns";
import { usePut } from "../../source/api/common/use-put";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import AppHeader from "./app-header";
import { Cross2Icon } from "@radix-ui/react-icons";
import { getLastSevenDaysWorkoutCount } from "../../source/api/user/get-last-seven-days-workout-count";
import { router } from "expo-router";
import { getLastSevenDaysCalorieBurn } from "../../source/api/user/get-calories-burnt-last-week";

export default function AnalyticsRoute({
  navigate,
}: {
  navigate: typeof import("expo-router").router["navigate"];
  dom?: import("expo/dom").DOMProps;
  ref?: import("react").RefObject<import("react-native-webview").WebView>;
}) {
  return (
    <ShadLayout navigate={navigate}>
      <Charts />
    </ShadLayout>
  );
}

function Charts() {
  const hydrate = useAuth.use.hydrate();
  const user = useAuth.use.user();
  const setUser = useAuth.use.setUser();
  const { toast } = useToast()
  const [open, setopen] = useState(false);
  const { data: weightHistory, refetch: refetchWeight } = getWeightHistory({
    variables: { id: user?.id },
    select: (data) => {
      const weightHistory: any[] = data?.data;
      return weightHistory.map(w => {
        return {
          weight: w.weight,
          date: w.createdAt
        }
      })
    },
  });

  const { data: workoutCount } = getLastSevenDaysWorkoutCount({
    refetchOnMount: 'always',
    select: (data) => {
      
      return {
        workoutCounts: data.data,
        totalWorkouts: data.data.reduce((acc:any, curr:any) => {
          return acc += parseInt(curr?.entryCount);
        }, 0)
      }
    }
  });

  const { data: calorieBurn } = getLastSevenDaysCalorieBurn({
    refetchOnMount: 'always',
    select: (data) => {
      let todaysCalorieBurn = 0;
      const total =  data.data.reduce((acc:any, curr:any) => {
        if(isToday(curr.date)) {
          todaysCalorieBurn = curr?.totalCaloriesBurnt;
        }
        return acc += parseInt(curr?.totalCaloriesBurnt);
      }, 0)
      return {
        calories: data.data,
        average: total / data.data.length,
        totalCalories: total,
        todaysCalorieBurn
      }
    }
  });
  
  const { mutate: updateWeight } = usePut({
    onSuccess: (response: any) => {
      if (user) {
        setUser({ ...user, weight: response.data.data.weight });
        refetchWeight();
        hydrate()
        setopen(false)
        toast({description: 'Weight saved successfully', variant: 'success'});

      }
    },
  });

  const addWeight = (data: any) => {
    updateWeight({ endpoint: `/member/weight/${user?.id}`, payload: {...data, previousWeight: user?.weight} });
  };  


  return (
    <>
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
    <div className="grid w-full flex-1 gap-3 lg:max-w-[20rem]">
    <p className="pl-2 text-xl font-semibold font-mono">
          Analytics
        </p>
        <Card className="md:max-w-xs" x-chunk="charts-01-chunk-3">
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-center">
            <CardTitle className="font-mono">Workouts</CardTitle>
            <Button size="sm" variant="secondary" onClick={() => router.push("/workout-logs")} >
            <ArrowRight size={17} />
            </Button>
            </div>
            <CardDescription>
              Over the last 7 days, you have worked out {workoutCount?.workoutCounts?.length} days, Great!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              {workoutCount?.totalWorkouts}
              <span className="text-sm font-normal text-muted-foreground">
                exercise done
              </span>
            </div>
            <ChartContainer
              config={{
                entryCount: {
                  label: "Entry Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="ml-auto w-[72px]"
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
                data={workoutCount?.workoutCounts}
              >
                <Bar
                  dataKey="entryCount"
                  fill="var(--color-entryCount)"
                  radius={2}
                  fillOpacity={0.2}
                  activeIndex={6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  hide
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        {/* <Card className="md:max-w-xs" x-chunk="charts-01-chunk-4">
          <CardContent className="flex gap-4 p-4 pb-2">
            <ChartContainer
              config={{
                move: {
                  label: "Move",
                  color: "hsl(var(--chart-1))",
                },
                stand: {
                  label: "Stand",
                  color: "hsl(var(--chart-2))",
                },
                exercise: {
                  label: "Exercise",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[140px] w-full"
            >
              <BarChart
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
                data={[
                  {
                    activity: "stand",
                    value: (8 / 12) * 100,
                    label: "8/12 hr",
                    fill: "var(--color-stand)",
                  },
                  {
                    activity: "exercise",
                    value: (46 / 60) * 100,
                    label: "46/60 min",
                    fill: "var(--color-exercise)",
                  },
                  {
                    activity: "move",
                    value: (245 / 360) * 100,
                    label: "245/360 kcal",
                    fill: "var(--color-move)",
                  },
                ]}
                layout="vertical"
                barSize={32}
                barGap={2}
              >
                <XAxis type="number" dataKey="value" hide />
                <YAxis
                  dataKey="activity"
                  type="category"
                  tickLine={false}
                  tickMargin={4}
                  axisLine={false}
                  className="capitalize"
                />
                <Bar dataKey="value" radius={5}>
                  <LabelList
                    position="insideLeft"
                    dataKey="label"
                    fill="white"
                    offset={8}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Move</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  562
                  <span className="text-sm font-normal text-muted-foreground">
                    kcal
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Exercise</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  73
                  <span className="text-sm font-normal text-muted-foreground">
                    min
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Stand</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  14
                  <span className="text-sm font-normal text-muted-foreground">
                    hr
                  </span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card> */}
      </div>
      <div className="grid w-full gap-2 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <p className="pl-2 text-xl font-semibold font-mono">
          Calories last week
        </p>
        <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              {calorieBurn?.todaysCalorieBurn}{" "}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                kcal
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                totalCaloriesBurnt: {
                  label: "Calorie Burn",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: -4,
                  right: -4,
                }}
                data={calorieBurn?.calories}
              >
                <Bar
                  dataKey="totalCaloriesBurnt"
                  fill="var(--color-totalCaloriesBurnt)"
                  radius={5}
                  fillOpacity={0.6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                    });
                  }}
                />
                <ChartTooltip
                  defaultIndex={2}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                  cursor={false}
                />
                <ReferenceLine
                  y={1200}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                >
                  <Label
                    position="insideBottomLeft"
                    value="Average Calories burnt"
                    offset={10}
                    fill="hsl(var(--foreground))"
                  />
                  <Label
                    position="insideTopLeft"
                    value="660"
                    className="text-lg"
                    fill="hsl(var(--foreground))"
                    offset={10}
                    startOffset={100}
                  />
                </ReferenceLine>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
              Over the past 7 days, you have burnt{" "}
              <span className="font-medium text-foreground">{calorieBurn?.totalCalories}</span>{" "}
              calories.
            </CardDescription>
            {/* <CardDescription>
              You need <span className="font-medium text-foreground">100</span>{" "}
              more calories to reach your goal this week.
            </CardDescription> */}
          </CardFooter>
        </Card>
        <div className="flex mt-6 justify-between items-center">
          <p className="pl-2 text-xl font-semibold font-mono ">Weight Trend</p>
          <WeightSheet setopen={setopen} open={open} weight={user?.weight} addWeight={(data:any) => addWeight(data)} weightGoal={user?.weightGoal}  />
         
        </div>

        <Card className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <div>
              <CardDescription>Current</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                {user?.weight}
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  kg
                </span>
              </CardTitle>
            </div>
            <div>
              <CardDescription>Goal</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
                {user?.weightGoal}
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  kg
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 items-center">
            <ChartContainer
              config={{
                weight: {
                  label: "Weight",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="w-full"
            >
              <LineChart
                accessibilityLayer
                margin={{
                  left: 14,
                  right: 14,
                  top: 10,
                }}
                data={weightHistory}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.5}
                />
                <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    return format(value, "MMM dd")
                  }}
                />
                <Line
                  dataKey="weight"
                  type="natural"
                  fill="var(--color-weight)"
                  stroke="var(--color-weight)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    fill: "var(--color-weight)",
                    stroke: "var(--color-weight)",
                    r: 4,
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      labelFormatter={(value) => {
                        return format(value, "MMM dd - h:m")
                      }}
                    />
                  }
                  cursor={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* <div className="grid w-full flex-1 gap-6">
        <Card className="md:max-w-xs" x-chunk="charts-01-chunk-5">
          <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Move</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  562/600
                  <span className="text-sm font-normal text-muted-foreground">
                    kcal
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Exercise</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  73/120
                  <span className="text-sm font-normal text-muted-foreground">
                    min
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Stand</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  8/12
                  <span className="text-sm font-normal text-muted-foreground">
                    hr
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
                stand: {
                  label: "Stand",
                  color: "hsl(var(--chart-3))",
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
                    activity: "stand",
                    value: (8 / 12) * 100,
                    fill: "var(--color-stand)",
                  },
                  {
                    activity: "exercise",
                    value: (46 / 60) * 100,
                    fill: "var(--color-exercise)",
                  },
                  {
                    activity: "move",
                    value: (245 / 360) * 100,
                    fill: "var(--color-move)",
                  },
                ]}
                innerRadius="20%"
                barSize={24}
                startAngle={90}
                endAngle={450}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  dataKey="value"
                  tick={false}
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="md:max-w-xs" x-chunk="charts-01-chunk-6">
          <CardHeader className="p-4 pb-0">
            <CardTitle>Active Energy</CardTitle>
            <CardDescription>
              You're burning an average of 754 calories per day. Good job!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
            <div className="flex items-baseline gap-2 text-3xl font-bold tabular-nums leading-none">
              1,254
              <span className="text-sm font-normal text-muted-foreground">
                kcal/day
              </span>
            </div>
            <ChartContainer
              config={{
                calories: {
                  label: "Calories",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="ml-auto w-[64px]"
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
                data={[
                  {
                    date: "2024-01-01",
                    calories: 354,
                  },
                  {
                    date: "2024-01-02",
                    calories: 514,
                  },
                  {
                    date: "2024-01-03",
                    calories: 345,
                  },
                  {
                    date: "2024-01-04",
                    calories: 734,
                  },
                  {
                    date: "2024-01-05",
                    calories: 645,
                  },
                  {
                    date: "2024-01-06",
                    calories: 456,
                  },
                  {
                    date: "2024-01-07",
                    calories: 345,
                  },
                ]}
              >
                <Bar
                  dataKey="calories"
                  fill="var(--color-calories)"
                  radius={2}
                  fillOpacity={0.2}
                  activeIndex={6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  hide
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="md:max-w-xs" x-chunk="charts-01-chunk-7">
          <CardHeader className="space-y-0 pb-0">
            <CardDescription>Time in Bed</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              8
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                hr
              </span>
              35
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                min
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={{
                time: {
                  label: "Time",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <AreaChart
                accessibilityLayer
                data={[
                  {
                    date: "2024-01-01",
                    time: 8.5,
                  },
                  {
                    date: "2024-01-02",
                    time: 7.2,
                  },
                  {
                    date: "2024-01-03",
                    time: 8.1,
                  },
                  {
                    date: "2024-01-04",
                    time: 6.2,
                  },
                  {
                    date: "2024-01-05",
                    time: 5.2,
                  },
                  {
                    date: "2024-01-06",
                    time: 8.1,
                  },
                  {
                    date: "2024-01-07",
                    time: 7.0,
                  },
                ]}
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="date" hide />
                <YAxis domain={["dataMin - 5", "dataMax + 2"]} hide />
                <defs>
                  <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="time"
                  type="natural"
                  fill="url(#fillTime)"
                  fillOpacity={0.4}
                  stroke="var(--color-time)"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  formatter={(value) => (
                    <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                      Time in bed
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          hr
                        </span>
                      </div>
                    </div>
                  )}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div> */}
    </div>
    </>
  );
}

const zSchema = z.object({
  weight: z.string(),
  weightGoal: z.string().optional(),
});


function WeightSheet({weight, addWeight, weightGoal, open, setopen}: any) {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm({
    defaultValues: {weight, weightGoal},
    resolver: zodResolver(zSchema),
  });
  
  return (
    <Sheet open={open}>
      <SheetTrigger> <Button onClick={() => setopen(true)} size="sm" variant="secondary">
            <Plus size={18} />
          </Button></SheetTrigger>
      <SheetContent side="bottom" hideClose>
        <SheetHeader className="text-left mb-5 flex flex-row items-center justify-between">
          <SheetTitle>Add Weight</SheetTitle>
        <Cross2Icon onClick={() => setopen(false)} className="h-4 w-4" />
        </SheetHeader>

        <div className="flex flex-col gap-4">
          <div>
            <ShadLabel htmlFor="password">Weight (kg)</ShadLabel>
            <Input placeholder="Enter weight" type="number" {...register('weight')} />
          </div>
          <div>
            <ShadLabel htmlFor="password">Weight Goal (kg)</ShadLabel>
            <Input placeholder="Enter goal" type="number" {...register('weightGoal')} />
          </div>
          <Button onClick={handleSubmit(addWeight)} >Submit</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
