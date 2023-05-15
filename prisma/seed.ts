import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  await prisma.ticketType.createMany({
    data: [
      {
        name: "Online",
        price: 100,
        isRemote: true,
        includesHotel: false,
      },
      {
        name: "Presencial",
        price: 600,
        isRemote: false,
        includesHotel: true,
      },
      {
        name: "Presencial",
        price: 250,
        isRemote: false,
        includesHotel: false,
      },
    ]
  });

  await prisma.hotel.createMany({
    data: [
      {
        name: "Driven Resort",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/1d/92/b5/d5/modala-beach-resort.jpg",
      },
      {
        name: "Driven Palace",
        image: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2017/08/29/1013/Grand-Hyatt-Rio-de-Janeiro-P443-Pool.jpg/Grand-Hyatt-Rio-de-Janeiro-P443-Pool.16x9.jpg",
      },
      {
        name: "Driven World",
        image: "https://www.ahstatic.com/photos/1276_ho_00_p_1024x768.jpg",
      },
    ]
  });

  await prisma.room.createMany({
    data: [
      {
        name: "101",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "102",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "103",
        capacity: 3,
        hotelId: 1,
      },
      {
        name: "104",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "201",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "202",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "203",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "204",
        capacity: 3,
        hotelId: 1,
      },
      {
        name: "301",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "302",
        capacity: 1,
        hotelId: 1,
      },
      {
        name: "303",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "304",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "401",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "402",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "403",
        capacity: 1,
        hotelId: 1,
      },
      {
        name: "404",
        capacity: 2,
        hotelId: 1,
      },
      {
        name: "101",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "101",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "102",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "104",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "201",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "202",
        capacity: 1,
        hotelId: 2,
      },
      {
        name: "203",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "204",
        capacity: 2,
        hotelId: 2,
      },
      {
        name: "101",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "102",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "103",
        capacity: 2,
        hotelId: 3,
      },
      {
        name: "104",
        capacity: 1,
        hotelId: 3,
      },
    ]
  })

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
