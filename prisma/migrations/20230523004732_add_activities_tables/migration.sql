-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "activitiesPlaceId" INTEGER NOT NULL,
    "activityDayId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "startTime" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitiesDays" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivitiesDays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitiesPlace" (
    "id" SERIAL NOT NULL,
    "namePlace" VARCHAR(255) NOT NULL,

    CONSTRAINT "ActivitiesPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingActivities" (
    "id" SERIAL NOT NULL,
    "activitiesId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingActivities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "fk_activityday" FOREIGN KEY ("activityDayId") REFERENCES "ActivitiesDays"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "fk_activitiesplace" FOREIGN KEY ("activitiesPlaceId") REFERENCES "ActivitiesPlace"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookingActivities" ADD CONSTRAINT "fk_users" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookingActivities" ADD CONSTRAINT "fk_activities" FOREIGN KEY ("activitiesId") REFERENCES "Activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
