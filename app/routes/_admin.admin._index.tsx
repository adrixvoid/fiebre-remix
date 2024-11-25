import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { formatCurrencyInCents, formatNumber } from "~/lib/currency";
import prisma from "~/server/lib/prisma";

import { DashboardCard } from "~/components/dashboard/dashboard-card";
import { Container } from "~/components/ui/container/Container";
import { Grid } from "~/components/ui/grid/Grid";
import { Section } from "~/components/ui/section/Section";

async function getSalesData() {
  const orders = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true
  })

  return {
    amount: (orders._sum.pricePaidInCents || 0) / 100,
    numberOfSales: orders._count || 0
  }
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaidInCents: true }
    })
  ])

  return {
    userCount,
    averageValuePerUser: userCount === 0
      ? 0
      : (orderData._sum.pricePaidInCents || 0) / userCount / 100
  }
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({ where: { published: true } }),
    prisma.product.count({ where: { published: false } })
  ])

  return {
    activeCount,
    inactiveCount
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

export default function Admin() {
  const { salesData, userData, productData } = useLoaderData<typeof loader>()
  return (
    <Section style={{ marginTop: "1rem" }}>
      <Container>
        <div>
          <Grid columns="3">
            <DashboardCard title="Sales" subtitle={`${formatNumber(salesData.numberOfSales)} Orders`} body={<p>{formatCurrencyInCents(salesData.amount)}</p>} />
            <DashboardCard title="Customers" subtitle={`${formatNumber(userData.averageValuePerUser)} Average Value`} body={<p>{userData.userCount}</p>} />
            <DashboardCard title="Active Products" subtitle={`${formatNumber(productData.inactiveCount)} Inactive`} body={<p>{productData.activeCount}</p>} />
          </Grid>
        </div>
      </Container>
    </Section>
  );
}
