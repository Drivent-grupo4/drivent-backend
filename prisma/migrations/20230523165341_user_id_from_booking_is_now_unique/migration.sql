/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Activities" DROP CONSTRAINT "fk_activitiesplace";

-- DropForeignKey
ALTER TABLE "Activities" DROP CONSTRAINT "fk_activityday";

-- DropForeignKey
ALTER TABLE "BookingActivities" DROP CONSTRAINT "fk_activities";

-- DropForeignKey
ALTER TABLE "BookingActivities" DROP CONSTRAINT "fk_users";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_key" ON "Booking"("userId");

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "fk_activityday" FOREIGN KEY ("activityDayId") REFERENCES "ActivitiesDays"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "fk_activitiesplace" FOREIGN KEY ("activitiesPlaceId") REFERENCES "ActivitiesPlace"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookingActivities" ADD CONSTRAINT "fk_users" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookingActivities" ADD CONSTRAINT "fk_activities" FOREIGN KEY ("activitiesId") REFERENCES "Activities"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
