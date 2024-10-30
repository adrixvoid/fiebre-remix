import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card/Card";
import { Container } from "~/components/ui/container/Container";
import { Grid } from "~/components/ui/grid/Grid";
import { Section } from "~/components/ui/section/Section";
import { formatCurrency, formatNumber } from "~/lib/price";


async function getSalesData() {
  // const data = await prisma.order.aggregate({
  //   _sum: { pricePaidInCents: true },
  //   _count: true
  // })

  // return {
  //   amount: (data._sum.pricePaidInCents || 0) / 100,
  //   numberOfSales: data._count
  // }

  return {
    amount: 0,
    numberOfSales: 0
  }
}

async function getUserData() {
  // const [userCount, orderData] = await Promise.all([
  //   prisma.user.count(),
  //   prisma.order.aggregate({
  //     _sum: { pricePaidInCents: true }
  //   })
  // ])

  // return {
  //   userCount,
  //   averageValuePerUser: userCount === 0
  //     ? 0
  //     : (orderData._sum.pricePaidInCents || 0) / userCount / 100
  // }

  return {
    userCount: 0,
    averageValuePerUser: 0
  }
}

async function getProductData() {
  // const [activeCount, inactiveCount] = await Promise.all([
  //   prisma.product.count({
  //     where: { isAvailableForPurchase: true }
  //   }),
  //   prisma.product.count({
  //     where: { isAvailableForPurchase: false }
  //   })
  // ])

  // return {
  //   activeCount,
  //   inactiveCount
  // }

  return {
    activeCount: 0,
    inactiveCount: 0
  }
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  // const categoryParam = new URL(request.url).searchParams.get('category');

  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData()
  ])

  return { salesData, userData, productData };
}

type DashboardCardProps = {
  title: string
  subtitle: string
  body: string
}

export function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}

export default function Admin() {
  const { salesData, userData, productData } = useLoaderData<typeof loader>()
  return (
    <Section marginBottom>
      <Container>
        <div>
          <Grid>
            <DashboardCard title="Sales" subtitle={formatNumber(salesData.numberOfSales)} body={formatCurrency(salesData.amount)} />
            <DashboardCard title="Customers" subtitle={formatNumber(userData.averageValuePerUser)} body={formatCurrency(userData.userCount)} />
            <DashboardCard title="Active Products" subtitle={`${formatNumber(productData.inactiveCount)} Inactive`} body={formatCurrency(productData.activeCount)} />
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
