import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card/Card";

export type DashboardCardProps = {
  title: string
  subtitle: string
  body: React.ReactNode
}

export function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card border shadow>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        {body}
      </CardContent>
    </Card>
  );
}