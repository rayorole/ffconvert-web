import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type APIUsageCardProps = {
    usage: number;
};

export function APIUsageCard({ usage }: APIUsageCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Usage</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{usage}%</div>
                {/* <Progress value={usage} className="mt-2" />  doesnt work currently*/}
                <p className="text-xs text-muted-foreground mt-2">of monthly limit</p>
            </CardContent>
        </Card>
    );
}
