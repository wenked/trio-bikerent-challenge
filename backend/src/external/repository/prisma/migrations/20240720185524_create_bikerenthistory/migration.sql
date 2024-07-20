-- CreateTable
CREATE TABLE `BikeRentHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bikeId` INTEGER NOT NULL,
    `candidateId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `rentDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BikeRentHistory_id_key`(`id`),
    PRIMARY KEY (`id`, `bikeId`, `candidateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BikeRentHistory` ADD CONSTRAINT `BikeRentHistory_bikeId_fkey` FOREIGN KEY (`bikeId`) REFERENCES `Bike`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BikeRentHistory` ADD CONSTRAINT `BikeRentHistory_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `Candidate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
