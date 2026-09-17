import { Router } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { sendOrderEmail } from "../email";

const router = Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      phone,
      collectionTime,
      notes,
      items,
    } = req.body;

    if (
      !customerName ||
      !phone ||
      !collectionTime ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Missing required order information",
      });
    }

    const menuItemIds = items.map(
      (item: { menuItemId: number }) => item.menuItemId,
    );

    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: menuItemIds,
        },
      },
    });

    let total = 0;

    const orderItems = items.map(
      (item: { menuItemId: number; quantity: number }) => {
        const menuItem = menuItems.find(
          (menuItem) => menuItem.id === item.menuItemId,
        );

        if (!menuItem) {
          throw new Error(
            `Menu item ${item.menuItemId} not found`,
          );
        }

        total += menuItem.price * item.quantity;

        return {
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: menuItem.price,
        };
      },
    );

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        collectionTime,
        notes: notes || null,
        total,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    await sendOrderEmail(order);

    res.status(201).json({
      message: "Order created successfully",
      orderId: order.id,
      customerName: order.customerName,
      total: order.total,
      status: "NEW",
    });
  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
});

export default router;